import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";

import { HashComparer } from "../../cryptography/hash-comparer";
import { Encrypter } from "../../cryptography/encrypter";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { UserRepository } from "./repositories/user-repository";

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
    role: string | undefined;
  }
>;

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UserRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
      role: user.role,
    });

    return right({
      accessToken,
      role: user.role,
    });
  }
}
