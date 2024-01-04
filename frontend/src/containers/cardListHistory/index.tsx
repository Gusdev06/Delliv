import React from "react";
import { useGetOrdersQuery } from "../../services/api";

import { Container } from "./styles";
import OrdersBoard from "../cardBoard";

const OrderListHistory: React.FC = () => {
  const { data: orders, error, isLoading } = useGetOrdersQuery();

  if (isLoading) return <div>Carregando pedidos...</div>;
  if (error) return <div>Ocorreu um erro ao buscar os pedidos.</div>;

  return (
    <Container>
      <OrdersBoard orders={orders || []} />
    </Container>
  );
};

export default OrderListHistory;
