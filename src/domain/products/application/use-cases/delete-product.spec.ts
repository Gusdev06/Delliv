import { DeleteProductUseCase } from "./delete-product";

import { makeProduct } from "@/test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryProductRepository } from "@/test/repositories/in-memory-product-repository";

let inMemoryProductsRepository: InMemoryProductRepository;

let sut: DeleteProductUseCase;

describe("Delete Product", () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductRepository();
    sut = new DeleteProductUseCase(inMemoryProductsRepository);
  });

  it("should be able to delete a product by id", async () => {
    const newProduct = makeProduct({}, new UniqueEntityID("1"));

    await inMemoryProductsRepository.create(newProduct);

    const result = await sut.execute({
      id: "1",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryProductsRepository.items).toHaveLength(0);
  });
});
