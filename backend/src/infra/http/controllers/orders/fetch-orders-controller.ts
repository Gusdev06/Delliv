import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";

import { FetchOrdersUseCase } from "@/domain/orders/application/use-cases/fetch-orders";
import { OrdersPresenter } from "../../presenters/orders-presenter";

const pageQueryParamSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller("/orders")
export class FetchOrdersController {
  constructor(private fetchOrders: FetchOrdersUseCase) {}

  @Get()
  async handle(@Query("page", queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchOrders.execute({
      page,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const orders = result.value.orders;

    return {
      orders: orders.map(OrdersPresenter.toHTTP),
    };
  }
}
