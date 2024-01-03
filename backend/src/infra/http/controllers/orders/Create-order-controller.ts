import { z } from "zod";

import { CreateOrderUseCase } from "@/domain/orders/application/use-cases/create-order";
import { JwtAuthGuard } from "@/infra/auth/jwt-auth.guard";
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { OrdersPresenter } from "../../presenters/orders-presenter";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";

const createOrderSchema = z.object({
  total: z.number().nonnegative(),
  itens: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().positive(),
    })
  ),
});

const bodyValidationPipe = new ZodValidationPipe(createOrderSchema);

type CreateOrderSchema = z.infer<typeof createOrderSchema>;

@Controller("/orders")
@UseGuards(JwtAuthGuard)
export class CreateOrderController {
  constructor(private useCase: CreateOrderUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateOrderSchema,
    @CurrentUser() user: UserPayload
  ) {
    const result = await this.useCase.execute({
      userId: user.sub,
      status: "PENDING",
      itens: body.itens,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const order = result.value.order;

    return {
      order: OrdersPresenter.toHTTP(order),
    };
  }
}
