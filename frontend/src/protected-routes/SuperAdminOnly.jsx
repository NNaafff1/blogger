import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SuperAdminOnly = () => {
  const { user } = useAuth();
  return user?.role === "superAdmin" ? <Outlet /> : <Navigate to="/" />;
};

export default SuperAdminOnly;
