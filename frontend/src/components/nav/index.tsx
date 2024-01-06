import {
  Container,
  HomeIcon,
  NavItem,
  NavList,
  OrderHistoryIcon,
  ProductIcon,
} from "./styles";

const Nav = () => {
  return (
    <Container>
      <NavList>
        <NavItem>
          <HomeIcon />
          <a href="/admin">Home</a>
        </NavItem>
        <NavItem>
          <OrderHistoryIcon />
          <a href="/admin/order-history">Order history</a>
        </NavItem>
        <NavItem>
          <ProductIcon />
          <a href="#">Products</a>
        </NavItem>
      </NavList>
    </Container>
  );
};

export default Nav;
