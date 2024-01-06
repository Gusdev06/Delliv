import { ToastContainer } from "react-toastify";
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
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  );
};

export default Aside;
