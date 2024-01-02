import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { CreateProductUseCase } from "@/domain/products/application/use-cases/create-product";

const createProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
});

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;

@Controller("/products")
export class CreateProductController {
  constructor(private createProduct: CreateProductUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateProductBodySchema) {
    const { name, description, category, price } = body;

    const result = await this.createProduct.execute({
      name,
      description,
      category,
      price,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
