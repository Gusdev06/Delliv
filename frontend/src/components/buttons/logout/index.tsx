import { useDispatch } from "react-redux";
import { persistor } from "../../../store";
import { logOut } from "../../../store/reducers/auth";
import { Button, Container, LogoutIcon } from "./styles";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    persistor.purge();
  };

  return (
    <Container>
      <LogoutIcon />
      <Button onClick={handleLogout}>Logout</Button>
    </Container>
  );
};

export default LogoutButton;
