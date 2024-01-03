import { InMemoryOrderRepository } from "@/test/repositories/in-memory-order-repository";
import { EditOrderUseCase } from "./edit-order";
import { Order } from "../../enterprise/entities/Order";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

let inMemoryOrderRepository: InMemoryOrderRepository;
let editOrderUseCase: EditOrderUseCase;

describe("Edit Order Use Case", () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();
    editOrderUseCase = new EditOrderUseCase(inMemoryOrderRepository);
  });

  it("should be able to edit an existing order", async () => {
    const existingOrder = Order.create({
      userId: "1",
      status: "pending",
      itens: [],
      user: {
        id: "1",
        name: "John Doe",
        email: "  ",
        address: " ",
      },
      total: 0,
    });
    inMemoryOrderRepository.create(existingOrder);

    const editOrderData = {
      orderId: existingOrder.id.toValue(),
      status: "new-status",
    };

    const result = await editOrderUseCase.execute(editOrderData);

    if ("order" in result.value) {
      expect(result.isRight()).toBe(true);
      expect(result.value.order.getStatus()).toBe("new-status");
    } else {
      fail("Result should have an order");
    }
  });

  it("should return an error if the order does not exist", async () => {
    const nonExistingOrderId = "non-existing-order-id";
    const editOrderData = {
      orderId: nonExistingOrderId,
      status: "new-status",
    };

    const result = await editOrderUseCase.execute(editOrderData);

    if ("order" in result.value) {
      fail("Result should not have an order");
    } else {
      expect(result.isLeft()).toBe(true);
      expect(result.value).toBeInstanceOf(ResourceNotFoundError);
    }
  });

  // Outros testes de casos de borda e falha conforme necessário
});
