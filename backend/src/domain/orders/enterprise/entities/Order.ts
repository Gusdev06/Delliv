import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { OrderItem } from "./OrderItem";

export interface IUser {
  id: string;
  name: string;
  email: string;
  address: string;
}

export interface IOrderProps {
  id?: UniqueEntityID;
  userId: string;
  itens: OrderItem[];
  user: IUser;
  status: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Order extends AggregateRoot<IOrderProps> {
  private touch() {
    this.props.updatedAt = new Date();
  }

  get userId() {
    return this.props.userId;
  }

  get user() {
    return this.props.user;
  }

  set user(value: IUser) {
    this.props.user = value;
    this.touch();
  }

  get orderItens() {
    return this.props.itens;
  }

  set orderItens(value: OrderItem[]) {
    this.props.itens = value;
    this.touch();
  }

  get status() {
    return this.props.status;
  }

  get total() {
    return this.props.total;
  }

  set total(value: number) {
    this.props.total = value;
    this.touch();
  }

  get itens() {
    return this.props.itens;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<IOrderProps, "createdAt" | "updatedAt">,
    id?: UniqueEntityID
  ) {
    const order = new Order(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id
    );

    return order;
  }

  addItem(item: OrderItem) {
    this.props.itens.push(item);
    this.recalculateTotal();
    this.touch();
  }

  getStatus(): string {
    return this.status;
  }

  setStatus(newStatus: string) {
    this.props.status = newStatus;
    this.touch();
  }

  public recalculateTotal() {
    this.props.total = this.props.itens.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }
}
