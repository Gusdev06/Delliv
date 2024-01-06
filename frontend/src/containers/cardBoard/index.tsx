import Order from "../../models";
import OrderCardHistory from "../cardHistory";
import { CardBoardColumn, CardBoardContainer } from "./styles";

interface OrdersBoardProps {
  orders: Order[];
}

const OrdersBoard: React.FC<OrdersBoardProps> = ({ orders }) => {
  const groupedOrders = orders.reduce<Record<string, Order[]>>((acc, order) => {
    const status = order.status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(order);
    return acc;
  }, {});

  const orderStatuses = [
    "PENDING",
    "PREPARING",
    "READY",
    "DELIVERING",
    "DELIVERED",
    "CANCELLED",
  ];

  return (
    <CardBoardContainer>
      {orderStatuses.map(
        (status) =>
          groupedOrders[status] && (
            <CardBoardColumn key={status} style={{ margin: "10px" }}>
              <h3>
                {status} ({groupedOrders[status].length})
              </h3>
              {groupedOrders[status].map((order) => (
                <OrderCardHistory key={order.id} order={order} />
              ))}
            </CardBoardColumn>
          )
      )}
    </CardBoardContainer>
  );
};

export default OrdersBoard;
