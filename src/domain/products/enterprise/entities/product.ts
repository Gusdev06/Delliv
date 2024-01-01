import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ProductProps {
  name: string
  description: string
  category: string
  price: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Product extends AggregateRoot<ProductProps> {


  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get category() {
    return this.props.category
  }

  set category(category: string) {
    this.props.category = category
    this.touch()
  }


  get price() {
    return this.props.price
  }

  set price(price: number) {
    this.props.price = price
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<ProductProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const product = new Product(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return product
  }
}
