import { PaginationParams } from "@/core/repositories/pagination-params";
import { OrderItemRepository } from "@/domain/orders/application/repositories/Order-item-repository";
import { OrderItem } from "@/domain/orders/enterprise/entities/OrderItem";

export class InMemoryOrderItemRepository implements OrderItemRepository {
  public items: OrderItem[] = [];

  async findById(id: string): Promise<OrderItem | undefined> {
    const orderitem = this.items.find(
      (orderitem) => orderitem.id.toString() === id
    );

    return orderitem || undefined;
  }

  async findMany({ page }: PaginationParams) {
    const orderitem = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return orderitem;
  }

  async save(orderitem: OrderItem): Promise<void> {
    const index = this.items.findIndex((p) => p.id.equals(orderitem.id));

    this.items[index] = orderitem;
  }

  async create(orderitem: OrderItem): Promise<void> {
    this.items.push(orderitem);
  }

  async delete(orderitem: OrderItem): Promise<void> {
    this.items = this.items.filter((p) => !p.id.equals(orderitem.id));
  }
}
