import { User } from "@prisma/client";

export interface IUserPresenter {
  id: string;
  name: string;
  address: string;
  email: string;
  role: string;
}

export class UserPresenter {
  static toHTTP(user: IUserPresenter) {
    return {
      id: user.id,
      name: user.name,
      address: user.address,
      email: user.email,
      role: user.role,
    };
  }
}
