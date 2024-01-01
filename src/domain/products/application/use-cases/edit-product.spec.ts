import { EditProductUseCase } from "./edit-product";

import { makeProduct } from "@/test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryProductRepository } from "@/test/repositories/in-memory-product-repository";

let inMemoryProductsRepository: InMemoryProductRepository;

let sut: EditProductUseCase;

describe("Edit Product", () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductRepository();
    sut = new EditProductUseCase(inMemoryProductsRepository);
  });

  it("should be able to edit a product by id", async () => {
    const newProduct = makeProduct({}, new UniqueEntityID("1"));

    await inMemoryProductsRepository.create(newProduct);

    const result = await sut.execute({
      id: "1",
      name: "new name",
      description: "new description",
      price: 100,
      category: "new category",
    });

    expect(result.isRight()).toBe(true);
  });
});
