import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Product,
  ProductProps,
} from '@/domain/products/enterprise/entities/product'

export function makeProduct(
  override: Partial<ProductProps> = {},
  id?: UniqueEntityID,
) {
  const product = Product.create(
    {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.productMaterial(),
      price: faker.number.float(),
      ...override,
    },
    id,
  )

  return product
}


