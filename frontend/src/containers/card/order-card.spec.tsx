import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import OrderCard from ".";
import { useUpdateOrderStatusMutation } from "../../services/api";

jest.mock("../../services/api", () => ({
  useUpdateOrderStatusMutation: jest.fn(),
}));

const mockOrder = {
  id: "1",
  items: [
    {
      id: "item1",
      productId: "prod1",
      product: {
        id: "prod1",
        name: "Margherita Pizza",
        description:
          "Traditional pizza with tomato sauce, mozzarella cheese, and basil.",
        price: 20.0,
      },
      quantity: 2,
      price: 40.0,
    },
    {
      id: "item2",
      productId: "prod2",
      product: {
        id: "prod2",
        name: "Bolognese Lasagna",
        description: "Lasagna stuffed with minced meat and Bolognese sauce.",
        price: 15.0,
      },
      quantity: 1,
      price: 15.0,
    },
  ],
  user: {
    id: "user123",
    name: "João Silva",
    address: "123 Flower Street, City Garden",
  },
  total: 55.0,
  status: "PENDING",
  created_at: "2024-01-06T12:00:00Z",
};

describe("OrderCard Component - Complete State Flow", () => {
  const mockUpdateOrderStatus = jest.fn().mockImplementation(() => ({
    unwrap: jest.fn(),
  }));

  beforeEach(() => {
    (useUpdateOrderStatusMutation as jest.Mock).mockReturnValue([
      mockUpdateOrderStatus,
      { isLoading: false, isError: false },
    ]);
  });

  it("should test initial state", async () => {
    const { findByTestId } = render(<OrderCard order={mockOrder} />);

    const buttonAccept = await findByTestId("button-accept");
    const buttonReject = await findByTestId("button-reject");

    expect(buttonAccept).toBeInTheDocument();
    expect(buttonReject).toBeInTheDocument();

    expect(screen.getByText("PENDING")).toBeInTheDocument();
  });

  it("should accept the order, the status must be PREPARING, and the READY and DISPATCH buttons must appear on the screen", async () => {
    const { findByTestId, findByText } = render(
      <OrderCard order={mockOrder} />
    );

    const buttonAccept = await findByTestId("button-accept");

    fireEvent.click(buttonAccept);

    const buttonReady = await findByText("READY");
    const buttonDispatch = await findByText("DISPATCH");

    await waitFor(() => {
      expect(mockUpdateOrderStatus).toHaveBeenCalledWith({
        orderId: mockOrder.id,
        status: "PREPARING",
      });

      expect(buttonAccept).not.toBeInTheDocument();

      expect(buttonReady).toBeInTheDocument();

      expect(buttonDispatch).toBeInTheDocument();
    });
  });

  it("should update the order, the status must be READY and the DELIVERED and DISPATCH buttons must appear on the screen", async () => {
    const { findByText, findByTestId } = render(
      <OrderCard order={mockOrder} />
    );

    const buttonAccept = await findByTestId("button-accept");

    fireEvent.click(buttonAccept);

    const buttonReady = await findByText("READY");

    fireEvent.click(buttonReady);

    const buttonDelivered = await findByText("DELIVERED");

    const buttonDispatch = await findByText("DISPATCH");

    await waitFor(() => {
      expect(mockUpdateOrderStatus).toHaveBeenCalledWith({
        orderId: mockOrder.id,
        status: "READY",
      });

      expect(buttonReady).not.toBeInTheDocument();
      expect(buttonDelivered).toBeInTheDocument();
      expect(buttonDispatch).toBeInTheDocument();
    });
  });

  it("should update the order, the status should be DELIVERING and the DELIVERED button SHOULD appear on the screen", async () => {
    const { findByText, findByTestId } = render(
      <OrderCard order={mockOrder} />
    );

    const buttonAccept = await findByTestId("button-accept");

    fireEvent.click(buttonAccept);

    const buttonDispatch = await findByText("DISPATCH");

    fireEvent.click(buttonDispatch);

    const buttonDelivered = await findByText("DELIVERED");

    await waitFor(() => {
      expect(mockUpdateOrderStatus).toHaveBeenCalledWith({
        orderId: mockOrder.id,
        status: "DELIVERING",
      });

      expect(buttonDispatch).not.toBeInTheDocument();
      expect(buttonDelivered).toBeInTheDocument();
    });
  });

  it("should update the status to DELIVERED and disappear", async () => {
    const { findByText, findByTestId, queryByText } = render(
      <OrderCard order={mockOrder} />
    );

    const buttonAccept = await findByTestId("button-accept");

    fireEvent.click(buttonAccept);

    const buttonDispatch = await findByText("DISPATCH");

    fireEvent.click(buttonDispatch);

    const buttonDelivered = await findByText("DELIVERED");

    fireEvent.click(buttonDelivered);

    await waitFor(() => {
      expect(mockUpdateOrderStatus).toHaveBeenCalledWith({
        orderId: mockOrder.id,
        status: "DELIVERED",
      });

      expect(queryByText(`Order #${mockOrder.id}`)).toBeNull();
    });
  });
  it("should update the status to CANCELLED when rejecting the order and disappear", async () => {
    const { findByTestId, queryByText } = render(
      <OrderCard order={mockOrder} />
    );

    const buttonReject = await findByTestId("button-reject");

    fireEvent.click(buttonReject);

    await waitFor(() => {
      expect(mockUpdateOrderStatus).toHaveBeenCalledWith({
        orderId: mockOrder.id,
        status: "CANCELLED",
      });

      expect(queryByText(`Order #${mockOrder.id}`)).toBeNull();
    });
  });
});
