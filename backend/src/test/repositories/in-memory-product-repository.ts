import { PaginationParams } from "./../../core/repositories/pagination-params";
import { ProductRepository } from "@/domain/products/application/repositories/product-repository";
import { Product } from "@/domain/products/enterprise/entities/product";

export class InMemoryProductRepository implements ProductRepository {
  public items: Product[] = [];

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((product) => product.id.toString() === id);

    return product || null;
  }

  async findMany({ page }: PaginationParams) {
    const product = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return product;
  }

  async save(product: Product): Promise<void> {
    const index = this.items.findIndex((p) => p.id.equals(product.id));

    this.items[index] = product;
  }

  async create(product: Product): Promise<void> {
    this.items.push(product);
  }

  async delete(product: Product): Promise<void> {
    this.items = this.items.filter((p) => !p.id.equals(product.id));
  }
}
