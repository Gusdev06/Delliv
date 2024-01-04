import Aside from "../../../containers/aside";
import OrderListHistory from "../../../containers/cardListHistory";

import { Container } from "./styles";

const OrderHistory = () => {
  return (
    <Container>
      <Aside />
      <OrderListHistory />
    </Container>
  );
};

export default OrderHistory;
