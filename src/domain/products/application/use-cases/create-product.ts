import { Product } from '@/domain/products/enterprise/entities/product'
import { ProductRepository } from '../repositories/product-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface CreateProductUseCaseRequest {
  name: string
  description: string
  category: string
  price: number

}

type CreateProductUseCaseResponse = Either<
  null,
  {
    product: Product
  }
>

@Injectable()
export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) { }

  async execute({
    name,
    description,
    category,
    price,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = Product.create({
      name,
      description,
      category,
      price,

    })

    await this.productRepository.create(product)

    return right({
      product,
    })
  }
}
