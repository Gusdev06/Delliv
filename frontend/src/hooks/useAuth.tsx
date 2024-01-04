import { useSelector } from "react-redux";
import { selectCurrentToken, selectUserRole } from "../store/reducers/auth";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectUserRole);

  return {
    isAuthenticated: token !== null,
    role,
  };
};

export default useAuth;
