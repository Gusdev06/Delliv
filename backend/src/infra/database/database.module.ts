import { PrismaOrderItemRepository } from "./prisma/repositories/prisma-order-item-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "@/domain/users/application/use-cases/repositories/user-repository";
import { PrismaUsersRepository } from "./prisma/repositories/prisma-user-repository";
import { ProductRepository } from "@/domain/products/application/repositories/product-repository";
import { PrismaProductsRepository } from "./prisma/repositories/prisma-product-repository";
import { OrderRepository } from "@/domain/orders/application/repositories/OrderRepository";
import { PrismaOrderRepository } from "./prisma/repositories/prisma-order-repository";
import { OrderItemRepository } from "@/domain/orders/application/repositories/Order-item-repository";

@Module({
  providers: [
    PrismaService,

    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: ProductRepository,
      useClass: PrismaProductsRepository,
    },

    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
    {
      provide: OrderItemRepository,
      useClass: PrismaOrderItemRepository,
    },
  ],
  exports: [
    PrismaService,
    UserRepository,
    ProductRepository,
    OrderRepository,
    OrderItemRepository,
  ],
})
export class DatabaseModule {}
