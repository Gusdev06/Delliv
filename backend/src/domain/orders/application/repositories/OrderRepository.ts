import { PaginationParams } from "@/core/repositories/pagination-params";
import { Order } from "../../enterprise/entities/Order";

export abstract class OrderRepository {
  abstract findById(id: string): Promise<Order | undefined>;
  abstract findMany(params: PaginationParams): Promise<Order[]>;
  abstract save(order: Order): Promise<void>;
  abstract create(order: Order): Promise<void>;
  abstract delete(order: Order): Promise<void>;
}
