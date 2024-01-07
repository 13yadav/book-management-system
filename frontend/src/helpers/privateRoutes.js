import { Outlet, Navigate } from "react-router-dom";
import { getToken } from "../services/JwtService";

const PrivateRoutes = () => {
  const isAuthenticated = !!getToken();
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
