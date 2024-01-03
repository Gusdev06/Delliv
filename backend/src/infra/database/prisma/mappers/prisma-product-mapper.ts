import { Product as PrismaProduct, Prisma } from "@prisma/client";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Product } from "@/domain/products/enterprise/entities/product";

export class PrismaProductMapper {
  static toDomain(raw: PrismaProduct): Product {
    return Product.create(
      {
        name: raw.name,
        description: raw.description,
        category: raw.category,
        price: raw.price,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
