import { Either, right } from "@/core/either";
import { Product } from "../../enterprise/entities/product";
import { ProductRepository } from "../repositories/product-repository";
import { Injectable } from "@nestjs/common";

interface FetchProductsUseCaseRequest {
  page: number;
}

type FetchProductsUseCaseResponse = Either<
  null,
  {
    products: Product[];
  }
>;

@Injectable()
export class FetchProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    page,
  }: FetchProductsUseCaseRequest): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productRepository.findMany({ page });

    return right({
      products,
    });
  }
}
