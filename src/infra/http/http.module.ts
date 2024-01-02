import { Module } from "@nestjs/common";

import { CreateAccountController } from "./controllers/user/create-account.controller";
import { DatabaseModule } from "../database/database.module";

import { CryptographyModule } from "../cryptography/cryptography.module";
import { RegisterUserUseCase } from "@/domain/users/application/use-cases/register-user";
import { AuthenticateUserUseCase } from "@/domain/users/application/use-cases/authenticate-user";
import { AuthenticateController } from "./controllers/user/auth-controller";
import { CreateProductController } from "./controllers/product/create-product.controller";
import { CreateProductUseCase } from "@/domain/products/application/use-cases/create-product";
import { FetchProductsController } from "./controllers/product/fetch-products-controller";
import { FetchProductsUseCase } from "@/domain/products/application/use-cases/fetch-products";
import { CreateOrderController } from "./controllers/orders/Create-order-controller";
import { CreateOrderUseCase } from "@/domain/orders/application/use-cases/create-order";
import { EditOrderStatusController } from "./controllers/orders/edit-order--controller";
import { EditOrderUseCase } from "@/domain/orders/application/use-cases/edit-order";
import { FetchOrdersController } from "./controllers/orders/fetch-orders-controller";
import { FetchOrdersUseCase } from "@/domain/orders/application/use-cases/fetch-orders";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateOrderController,
    FetchOrdersController,
    FetchProductsController,
    EditOrderStatusController,
    CreateProductController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    EditOrderUseCase,
    CreateOrderUseCase,
    FetchOrdersUseCase,
    CreateProductUseCase,
    FetchProductsUseCase,
  ],
})
export class HttpModule {}
