import { Product } from "@/domain/products/enterprise/entities/product";
import { ProductRepository } from "../repositories/product-repository";
import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

interface EditProductUseCaseRequest {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

type EditProductUseCaseResponse = Either<
  NotAllowedError,
  {
    product: Product;
  }
>;

@Injectable()
export class EditProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    id,
    name,
    description,
    price,
    category,
  }: EditProductUseCaseRequest): Promise<EditProductUseCaseResponse> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      return left(new NotAllowedError());
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;

    await this.productRepository.save(product);

    return right({
      product,
    });
  }
}
