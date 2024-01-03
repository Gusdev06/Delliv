import { PaginationParams } from "@/core/repositories/pagination-params";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ProductRepository } from "@/domain/products/application/repositories/product-repository";

import { PrismaProductMapper } from "../mappers/prisma-product-mapper";
import { Product } from "@/domain/products/enterprise/entities/product";

@Injectable()
export class PrismaProductsRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) {
      return null;
    }

    return PrismaProductMapper.toDomain(product);
  }

  async findMany({ page }: PaginationParams): Promise<Product[]> {
    const questions = await this.prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return questions.map(PrismaProductMapper.toDomain);
  }

  async create(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product);

    await this.prisma.product.create({
      data,
    });
  }

  async save(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product);

    await this.prisma.product.update({
      where: {
        id: product.id.toString(),
      },
      data,
    });
  }
  async delete(product: Product): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id: product.id.toString(),
      },
    });
  }
}
