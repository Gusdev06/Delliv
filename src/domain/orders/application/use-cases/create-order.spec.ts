import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeProduct } from "@/test/factories/make-product";
import { CreateOrderUseCase } from "./create-order";
import { InMemoryProductRepository } from "@/test/repositories/in-memory-product-repository";
import { InMemoryOrderItemRepository } from "@/test/repositories/in-memory-order-item-repository";
import { InMemoryOrderRepository } from "@/test/repositories/in-memory-order-repository";
import { left } from "@/core/either";

let inMemoryOrderRepository: InMemoryOrderRepository;
let inMemoryOrderItemRepository: InMemoryOrderItemRepository;
let inMemoryProductRepository: InMemoryProductRepository;
let sut: CreateOrderUseCase;

describe("create order", () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();
    inMemoryOrderItemRepository = new InMemoryOrderItemRepository();
    inMemoryProductRepository = new InMemoryProductRepository();

    const newProduct = makeProduct(
      {
        name: "product 1",
        description: "description 1",
        price: 10,
      },
      new UniqueEntityID("1")
    );

    inMemoryProductRepository.create(newProduct);

    sut = new CreateOrderUseCase(
      inMemoryOrderRepository,
      inMemoryProductRepository,
      inMemoryOrderItemRepository
    );
  });

  it("should create an order", async () => {
    const result = await sut.execute({
      userId: "1",
      itens: [
        { productId: "1", quantity: 2 },
        { productId: "2", quantity: 3 },
      ],
      status: "pending",
    });

    if ("order" in result.value) {
      const order = result.value.order;

      expect(inMemoryOrderRepository.items[0]).toEqual(order);
      expect(order.itens).toHaveLength(2);
      expect(order.itens).toEqual([
        expect.objectContaining({ productId: "1", quantity: 2 }),
        expect.objectContaining({ productId: "2", quantity: 3 }),
      ]);
      expect(inMemoryOrderItemRepository.items).toHaveLength(2);
    } else {
      return left(new Error("Product not found"));
    }
  });
});
