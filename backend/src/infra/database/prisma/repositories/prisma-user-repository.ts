import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { User } from "@/domain/users/enterprise/entities/User";
import { UserRepository } from "@/domain/users/application/use-cases/repositories/user-repository";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

@Injectable()
export class PrismaUsersRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data,
    });
  }
}
