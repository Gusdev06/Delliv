import LogoutButton from "../../components/buttons/logout";
import Nav from "../../components/nav";
import { AsideStyle, Container } from "./styles";

const Aside = () => {
  return (
    <Container>
      <AsideStyle>
        <h1>Delliv</h1>
        <Nav />
        <LogoutButton />
      </AsideStyle>
    </Container>
  );
};

export default Aside;
