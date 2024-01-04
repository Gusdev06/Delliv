import {
  Container,
  HomeIcon,
  NavItem,
  NavList,
  OrderHistoryIcon,
  ProductIcon,
} from "./styles";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Container>
      <NavList>
        <NavItem>
          <HomeIcon />
          <Link to="/admin">Home</Link>
        </NavItem>
        <NavItem>
          <OrderHistoryIcon />
          <Link to="/admin/order-history">Order history</Link>
        </NavItem>
        <NavItem>
          <ProductIcon />
          <Link to="products">Products</Link>
        </NavItem>
      </NavList>
    </Container>
  );
};

export default Nav;
