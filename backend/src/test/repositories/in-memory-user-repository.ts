import { User } from "@/domain/users/enterprise/entities/User";
import { UserRepository } from "@/domain/users/application/use-cases/repositories/user-repository";

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = [];

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User) {
    this.items.push(user);
  }
}
