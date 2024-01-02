import { Product } from "./../../../domain/products/enterprise/entities/product";
import { Order } from "@/domain/orders/enterprise/entities/Order";

export class OrdersPresenter {
  static toHTTP(orders: Order) {
    return {
      id: orders.id.toString(),
      user: {
        id: orders.user.id,
        name: orders.user.name,
        email: orders.user.email,
        address: orders.user.address,
      },
      items: orders.itens.map((item) => ({
        id: item.id.toString(),
        productId: item.productId,
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      })),
      total: orders.total,
      status: orders.status,
      created_at: orders.createdAt,
    };
  }
}
