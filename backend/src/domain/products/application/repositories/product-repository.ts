import { PaginationParams } from "@/core/repositories/pagination-params";
import { Product } from "@/domain/products/enterprise/entities/product";

export abstract class ProductRepository {
  abstract findById(id: string): Promise<Product | null>;
  abstract findMany(params: PaginationParams): Promise<Product[]>;
  abstract save(product: Product): Promise<void>;
  abstract create(product: Product): Promise<void>;
  abstract delete(product: Product): Promise<void>;
}
