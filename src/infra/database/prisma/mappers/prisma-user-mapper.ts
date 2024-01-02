import { User as PrismaUser, Prisma, UserRole } from "@prisma/client";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { User } from "@/domain/users/enterprise/entities/User";

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        role: raw.role,
        address: raw.address,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role as UserRole,
      address: user.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
