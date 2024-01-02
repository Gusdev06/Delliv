import { IUser } from "./../../enterprise/entities/Order";
import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../repositories/OrderRepository";
import { ProductRepository } from "@/domain/products/application/repositories/product-repository";
import { OrderItemRepository } from "../repositories/Order-item-repository";
import { Order } from "../../enterprise/entities/Order";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { OrderItem } from "../../enterprise/entities/OrderItem";

interface ICreateOrderUseCaseRequest {
  userId: string;
  itens: { productId: string; quantity: number }[];
  status?: string;
}

type CreateOrderUseCaseResponse = Either<Error, { order: Order }>;

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
    private orderitemRepository: OrderItemRepository
  ) {}

  async execute({
    userId,
    itens,
    status = "pending",
  }: ICreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      userId,
      status,
      itens: [],
      total: 0,
      user: {} as IUser,
    });
    await this.orderRepository.create(order);

    const orderExist = await this.orderRepository.findById(order.id.toValue());

    if (!orderExist) {
      return left(new Error("Product not found"));
    }

    for (const itemDto of itens) {
      try {
        const product = await this.productRepository.findById(
          itemDto.productId
        );

        if (!product) {
          return left(new ResourceNotFoundError());
        }

        const orderItem = OrderItem.create({
          productId: itemDto.productId,
          quantity: itemDto.quantity,
          price: product.price,
          orderId: order.id.toString(),
          product: {
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            price: product.price,
          },
        });

        order.addItem(orderItem);
        await this.orderitemRepository.create(orderItem);
      } catch (error) {
        return left(new ResourceNotFoundError());
      }
    }

    await this.orderRepository.save(order);

    return right({ order });
  }
}
