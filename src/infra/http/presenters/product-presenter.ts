import { Product } from "@/domain/products/enterprise/entities/product";
export interface IProductPresenter {
  id: string;
  name: string;
  description: string;
  price: number;
}

export class ProductPresenter {
  static toHTTP(product: Product) {
    return {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      created_at: product.createdAt,
      updated_at: product.updatedAt,
    };
  }
}
