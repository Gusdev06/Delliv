import { PaginationParams } from "@/core/repositories/pagination-params";
import { OrderItem } from "../../enterprise/entities/OrderItem";

export abstract class OrderItemRepository {
  abstract findById(Id: string): Promise<OrderItem | undefined>;
  abstract findMany(params: PaginationParams): Promise<OrderItem[]>;
  abstract save(orderitem: OrderItem): Promise<void>;
  abstract create(orderitem: OrderItem): Promise<void>;
  abstract delete(orderitem: OrderItem): Promise<void>;
}
