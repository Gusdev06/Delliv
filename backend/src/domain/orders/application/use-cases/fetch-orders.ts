import { Either, right } from "@/core/either";

import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../repositories/OrderRepository";
import { Order } from "../../enterprise/entities/Order";

interface FetchOrdersUseCaseRequest {
  page: number;
}

type FetchOrdersUseCaseResponse = Either<
  null,
  {
    orders: Order[];
  }
>;

@Injectable()
export class FetchOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    page,
  }: FetchOrdersUseCaseRequest): Promise<FetchOrdersUseCaseResponse> {
    const orders = await this.orderRepository.findMany({ page });

    return right({
      orders,
    });
  }
}
