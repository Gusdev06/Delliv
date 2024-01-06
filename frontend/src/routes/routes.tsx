import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import PrivateRoute from "./private-route";
import OrderHistory from "../pages/admin/order-history";
import Home from "../pages/admin/home";
import LogoutButton from "../components/buttons/logout";

const Rotas = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="/" element={<PrivateRoute roleRequired="USER" />}>
      <Route path="home" element={<PrivatePage />} />
    </Route>
    <Route path="/admin" element={<PrivateRoute roleRequired="ADMIN" />}>
      <Route path="" element={<Home />}></Route>
      <Route path="order-history" element={<OrderHistory />}></Route>
      <Route path="products" element={<Products />}></Route>
    </Route>
  </Routes>
);

export default Rotas;

const PrivatePage = () => {
  return (
    <>
      <h1>USER PAGE</h1>
      <LogoutButton />
    </>
  );
};

const Unauthorized = () => {
  return <div>Unauthorized</div>;
};

const Products = () => {
  return <div>Products</div>;
};
