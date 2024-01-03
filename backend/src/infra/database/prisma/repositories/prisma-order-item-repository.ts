import { PrismaOrderItemMapper } from "./../mappers/prisma-order-item-mapper";
/* eslint-disable no-param-reassign */

import { OrderItemRepository } from "@/domain/orders/application/repositories/Order-item-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { OrderItem } from "@/domain/orders/enterprise/entities/OrderItem";
import { PaginationParams } from "@/core/repositories/pagination-params";
@Injectable()
export class PrismaOrderItemRepository implements OrderItemRepository {
  constructor(private prisma: PrismaService) {}

  async findById(Id: string): Promise<OrderItem | undefined> {
    const orderitem = await this.prisma.orderItem.findUnique({
      where: {
        Id,
      },
      include: { product: true },
    });

    if (!orderitem) {
      return undefined;
    }

    return PrismaOrderItemMapper.generate(orderitem);
  }
  async findMany({ page }: PaginationParams): Promise<OrderItem[]> {
    const orderitems = await this.prisma.orderItem.findMany({
      take: 20,
      skip: (page - 1) * 20,
      include: { product: true },
    });

    return orderitems.map(PrismaOrderItemMapper.generate);
  }

  async create(orderItem: OrderItem): Promise<void> {
    const products = await this.prisma.product.findFirst({
      where: {
        id: orderItem.productId,
      },
    });

    if (!products) {
      throw new Error("Product not found");
    }

    orderItem.calculatePrice(products.price);

    await this.prisma.orderItem.create({
      data: PrismaOrderItemMapper.toPersistence(orderItem),
    });
  }
  async delete(orderitem: OrderItem): Promise<void> {
    const data = PrismaOrderItemMapper.toPersistence(orderitem);
    await this.prisma.orderItem.delete({
      where: {
        Id: data.Id,
      },
    });
  }
  async save(orderitem: OrderItem): Promise<void> {
    const data = PrismaOrderItemMapper.toPersistence(orderitem);
    await this.prisma.orderItem.update({
      where: {
        Id: data.Id,
      },

      data,
    });
  }
}
