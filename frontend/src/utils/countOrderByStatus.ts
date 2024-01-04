import Order from "../models";

interface OrdersCountByStatus {
  [key: string]: number;
}

const countOrdersByStatus = (orders: Order[]): OrdersCountByStatus => {
  return orders.reduce((acc: OrdersCountByStatus, order: Order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
};

export default countOrdersByStatus;
