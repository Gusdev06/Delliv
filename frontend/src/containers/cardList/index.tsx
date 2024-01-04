import { useGetOrdersQuery } from "../../services/api";
import OrderCard from "../card";
import { Container } from "./styles";

const OrderList = () => {
  const { data: orders, error, isLoading } = useGetOrdersQuery();

  if (isLoading) return <div>Carregando pedidos...</div>;
  if (error) return <div>Ocorreu um erro ao buscar os pedidos.</div>;

  return (
    <Container>
      {(orders || []).map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </Container>
  );
};

export default OrderList;
