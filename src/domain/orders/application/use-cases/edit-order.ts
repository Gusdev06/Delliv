import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Injectable } from "@nestjs/common";
import { Order } from "../../enterprise/entities/Order";
import { OrderRepository } from "../repositories/OrderRepository";

interface IEditOrderUseCaseRequest {
  orderId: string;
  status: string;
}

type EditOrderUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    order: Order;
  }
>;
@Injectable()
export class EditOrderUseCase {
  constructor(private repository: OrderRepository) {}
  async execute({
    orderId,
    status,
  }: IEditOrderUseCaseRequest): Promise<EditOrderUseCaseResponse> {
    const order = await this.repository.findById(orderId);

    if (!order) {
      return left(new ResourceNotFoundError());
    }

    order.setStatus(status);

    await this.repository.save(order);
    return right({ order });
  }
}
