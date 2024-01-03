import { PaginationParams } from "@/core/repositories/pagination-params";
import { OrderRepository } from "@/domain/orders/application/repositories/OrderRepository";
import { Order } from "@/domain/orders/enterprise/entities/Order";

export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = [];

  async findById(id: string): Promise<Order | undefined> {
    const order = this.items.find((order) => order.id.toString() === id);

    return order || undefined;
  }

  async findMany({ page }: PaginationParams) {
    const order = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return order;
  }

  async save(order: Order): Promise<void> {
    const index = this.items.findIndex((p) => p.id.equals(order.id));

    this.items[index] = order;
  }

  async create(order: Order): Promise<void> {
    this.items.push(order);
  }

  async delete(order: Order): Promise<void> {
    this.items = this.items.filter((p) => !p.id.equals(order.id));
  }
}
