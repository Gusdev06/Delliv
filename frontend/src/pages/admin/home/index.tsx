import Aside from "../../../containers/aside";
import OrderList from "../../../containers/cardList";

import { Container } from "./styles";

const Home = () => {
  return (
    <Container>
      <Aside />
      <OrderList />
    </Container>
  );
};

export default Home;
