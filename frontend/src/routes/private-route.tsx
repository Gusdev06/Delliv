import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface PrivateRouteProps {
  roleRequired: string;
}

const PrivateRoute = ({ roleRequired }: PrivateRouteProps) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role !== roleRequired) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
