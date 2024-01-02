import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";

import { FetchProductsUseCase } from "@/domain/products/application/use-cases/fetch-products";
import { JwtAuthGuard } from "@/infra/auth/jwt-auth.guard";
import { ProductPresenter } from "../../presenters/product-presenter";
import { Public } from "@/infra/auth/public";

const pageQueryParamSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller("/products")
export class FetchProductsController {
  constructor(private fetchProducts: FetchProductsUseCase) {}

  @Get()
  async handle(@Query("page", queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchProducts.execute({
      page,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const products = result.value.products;

    return {
      products: products.map(ProductPresenter.toHTTP),
    };
  }
}
