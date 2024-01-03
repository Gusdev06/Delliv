import { InMemoryProductRepository } from "@/test/repositories/in-memory-product-repository";
import { CreateProductUseCase } from "./create-product";

let inMemoryProductRepository: InMemoryProductRepository;
let sut: CreateProductUseCase;

describe("Create Product Use Case", () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new CreateProductUseCase(inMemoryProductRepository);
  });

  it("should be able to create a new product", async () => {
    const productData = {
      name: "Test Product",
      description: "Test Description",
      category: "Test Category",
      price: 100,
    };

    const result = await sut.execute(productData);

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      product: inMemoryProductRepository.items[0],
    });

    const createdProduct = inMemoryProductRepository.items[0];
    expect(createdProduct.name).toBe(productData.name);
    expect(createdProduct.description).toBe(productData.description);
    expect(createdProduct.category).toBe(productData.category);
    expect(createdProduct.price).toBe(productData.price);
  });
});
