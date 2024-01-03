import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { UserAlreadyExistsError } from "./errors/user-already-exists.error";
import { UserRepository } from "./repositories/user-repository";
import { HashGenerator } from "../../cryptography/hash-generator";
import { User } from "../../enterprise/entities/User";

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  role?: string;
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User;
  }
>;

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private usersRepository: UserRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    email,
    password,
    address,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
      role: "USER",
      address,
    });

    await this.usersRepository.create(user);

    return right({
      user,
    });
  }
}
