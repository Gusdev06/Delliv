import { OrderItem } from "@/domain/orders/enterprise/entities/OrderItem";

export interface IOrderItem {
  productId: string;
  quantity: number;
  price: number;
  orderId: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
  };
  createdAt: Date;
}

export class OrderItemPresenter {
  static toHTTP(orderitems: OrderItem) {
    return {
      id: orderitems.id.toString(),
      productId: orderitems.productId,
      product: {
        id: orderitems.product.id,
        name: orderitems.product.name,
        description: orderitems.product.description,
        price: orderitems.product.price,
      },
      quantity: orderitems.quantity,
      price: orderitems.price,
      orderId: orderitems.orderId,
      createdAt: orderitems.createdAt,
    };
  }
}
