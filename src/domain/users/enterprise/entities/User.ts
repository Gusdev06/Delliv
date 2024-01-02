import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface UserProps {
  name: string;
  email: string;
  password: string;
  role: string;
  address: string;
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  get role() {
    return this.props.role;
  }

  set role(role: string) {
    this.props.role = role;
  }

  get email() {
    return this.props.email;
  }

  get address() {
    return this.props.address;
  }

  get password() {
    return this.props.password;
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(props, id);

    return user;
  }
}
