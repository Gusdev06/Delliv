import { makeProduct } from "@/test/factories/make-product";
import { FetchProductsUseCase } from "./fetch-products";

import { InMemoryProductRepository } from "@/test/repositories/in-memory-product-repository";

let inMemoryProductRepository: InMemoryProductRepository;

let sut: FetchProductsUseCase;

describe("Fetch Products", () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();

    sut = new FetchProductsUseCase(inMemoryProductRepository);
  });

  it("should be able to fetch recent products", async () => {
    await inMemoryProductRepository.create(
      makeProduct({ createdAt: new Date(2022, 0, 20) })
    );
    await inMemoryProductRepository.create(
      makeProduct({ createdAt: new Date(2022, 0, 18) })
    );
    await inMemoryProductRepository.create(
      makeProduct({ createdAt: new Date(2022, 0, 23) })
    );

    const result = await sut.execute({
      page: 1,
    });

    expect(result.value?.products).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ]);
  });

  it("should be able to fetch paginated recent products", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryProductRepository.create(makeProduct());
    }

    const result = await sut.execute({
      page: 2,
    });

    expect(result.value?.products).toHaveLength(2);
  });
});
