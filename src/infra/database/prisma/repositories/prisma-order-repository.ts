import { OrderRepository } from "@/domain/orders/application/repositories/OrderRepository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

import { Order } from "@/domain/orders/enterprise/entities/Order";
import { PrismaOrderMapper } from "../mappers/prisma-order-mapper";
import { PaginationParams } from "@/core/repositories/pagination-params";

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Order | undefined> {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        itens: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return undefined;
    }

    return PrismaOrderMapper.generate(order);
  }
  async findMany({ page }: PaginationParams): Promise<Order[]> {
    const order = await this.prisma.order.findMany({
      take: 20,
      skip: (page - 1) * 20,
      include: {
        user: true,
        itens: {
          include: {
            product: true,
          },
        },
      },
    });

    return order.map(PrismaOrderMapper.generate);
  }
  async create(order: Order): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: order.userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await this.prisma.order.create({
      data: PrismaOrderMapper.toPersistence(order),
    });
  }
  async delete(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPersistence(order);
    await this.prisma.order.delete({
      where: {
        id: data.id,
      },
    });
  }

  async save(order: Order): Promise<void> {
    const existingOrder = await this.prisma.order.findUnique({
      where: {
        id: order.id.toString(),
      },
    });

    if (!existingOrder) {
      throw new Error("Order not found");
    }
    const data = PrismaOrderMapper.toPersistence(order);
    await this.prisma.order.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
