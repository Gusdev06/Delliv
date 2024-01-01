import { Product } from "@/domain/products/enterprise/entities/product";
import { ProductRepository } from "../repositories/product-repository";
import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

interface DeleteProductUseCaseRequest {
  id: string;
}

type DeleteProductUseCaseResponse = Either<
  string,
  {
    product: Product;
  }
>;

@Injectable()
export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    id,
  }: DeleteProductUseCaseRequest): Promise<DeleteProductUseCaseResponse> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      return left("Product not found");
    }

    await this.productRepository.delete(product);

    return right({
      product,
    });
  }
}
