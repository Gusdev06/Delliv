import { z } from "zod";

import { EditOrderUseCase } from "@/domain/orders/application/use-cases/edit-order";
import { Body, Controller, Param, Put } from "@nestjs/common";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { OrdersPresenter } from "../../presenters/orders-presenter";

const editOrderStatusSchema = z.object({
  status: z.string(),
});
const bodyValidationPipe = new ZodValidationPipe(editOrderStatusSchema);

type EditOrderStatusSchema = z.infer<typeof editOrderStatusSchema>;

@Controller("/orders")
export class EditOrderStatusController {
  constructor(private useCase: EditOrderUseCase) {}

  @Put(":orderId/status")
  async handle(
    @Param("orderId") orderId: string,
    @Body(bodyValidationPipe) body: EditOrderStatusSchema
  ) {
    const result = await this.useCase.execute({
      orderId,
      status: body.status,
    });

    if (result.isLeft()) {
      return {
        error: result.value,
      };
    }

    return {
      order: OrdersPresenter.toHTTP(result.value.order),
    };
  }
}
