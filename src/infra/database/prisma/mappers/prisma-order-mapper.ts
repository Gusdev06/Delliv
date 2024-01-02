import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { IUser, Order } from "@/domain/orders/enterprise/entities/Order";
import { OrderItem } from "@/domain/orders/enterprise/entities/OrderItem";
import { IOrderItem } from "@/infra/http/presenters/order-item-presenter";

import { OrderStatus, Order as POrder, Prisma } from "@prisma/client";

export interface IOrderPrisma extends Omit<POrder, "itens"> {
  itens: IOrderItem[];
  user: IUser;
}

export class PrismaOrderMapper {
  static generate(entity: IOrderPrisma): Order {
    return Order.create(
      {
        userId: entity.userId,
        user: {
          id: entity.user.id,
          name: entity.user.name,
          email: entity.user.email,
          address: entity.user.address,
        },
        itens: entity.itens.map((orderItem) =>
          OrderItem.create({
            productId: orderItem.productId,
            quantity: orderItem.quantity,
            price: orderItem.price,
            orderId: orderItem.orderId,
            product: {
              id: orderItem.product.id,
              name: orderItem.product.name,
              description: orderItem.product.description,
              price: orderItem.product.price,
            },
          })
        ),

        status: entity.status,
        total: entity.total,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt ?? undefined,
      },
      new UniqueEntityID(entity.id)
    );
  }

  static toPersistence(entity: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      userId: entity.userId,

      total: entity.total,
      status: entity.status as OrderStatus,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt ?? undefined,
    };
  }
}
