import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface IOrderItemProps {
  id?: UniqueEntityID;
  productId: string;
  quantity: number;
  price?: number;
  orderId: string;
  product: ProductDetails;
  createdAt: Date;
  updatedAt?: Date;
}

export class OrderItem extends Entity<IOrderItemProps> {
  private touch() {
    this.props.updatedAt = new Date();
  }

  get quantity() {
    return this.props.quantity;
  }

  get price() {
    return this.props.price !== undefined ? this.props.price : 0;
  }

  set price(value: number) {
    this.props.price = value;
    this.touch();
  }

  get orderId() {
    return this.props.orderId;
  }

  get product() {
    return this.props.product;
  }

  set product(value: ProductDetails) {
    this.props.product = value;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updateAt() {
    return this.props.createdAt;
  }

  get productId() {
    return this.props.productId;
  }

  set quantity(value: number) {
    this.props.quantity = value;
    this.touch();
  }

  public calculatePrice(productPrice: number) {
    this.price = productPrice * this.quantity;
  }

  static create(
    props: Optional<IOrderItemProps, "createdAt">,
    id?: UniqueEntityID
  ) {
    const orderItem = new OrderItem(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        price: props.product ? props.product.price * props.quantity : 0,
      },
      id
    );

    return orderItem;
  }
}
