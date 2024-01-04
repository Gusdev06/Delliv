import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import PrivateRoute from "./private-route";
import OrderHistory from "../pages/admin/order-history";
import Home from "../pages/admin/home";

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
    </Route>
  </Routes>
);

export default Rotas;

const PrivatePage = () => {
  return <div>User Page</div>;
};

const Unauthorized = () => {
  return <div>Unauthorized</div>;
};
