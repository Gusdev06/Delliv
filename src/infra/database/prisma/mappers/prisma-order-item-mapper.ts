import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import { OrderItem as POrderItem, Prisma } from "@prisma/client";
import { OrderItem } from "@/domain/orders/enterprise/entities/OrderItem";
import { Product } from "@/domain/products/enterprise/entities/product";
import { IProductPresenter } from "@/infra/http/presenters/product-presenter";

export interface IOrderItemPrisma extends Omit<POrderItem, "product"> {
  product: IProductPresenter;
}

export class PrismaOrderItemMapper {
  static generate(entity: IOrderItemPrisma): OrderItem {
    return OrderItem.create(
      {
        productId: entity.productId,
        quantity: entity.quantity,
        price: entity.price,
        orderId: entity.orderId,
        product: {
          id: entity.product.id,
          name: entity.product.name,
          description: entity.product.description,
          price: entity.product.price,
        },
        createdAt: entity.createdAt,
      },
      new UniqueEntityID(entity.Id)
    );
  }

  static toPersistence(
    entity: OrderItem
  ): Prisma.OrderItemUncheckedCreateInput {
    return {
      Id: entity.id.toString(),
      productId: entity.productId,
      quantity: entity.quantity,
      price: entity.price,
      orderId: entity.orderId,
      createdAt: entity.createdAt,
      updatedAt: entity.updateAt,
    };
  }
}
