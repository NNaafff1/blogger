import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/Auth/AuthContext";


const SuperAdminOnly = () => {
  const { user } = useContext(AuthContext);
  return user?.role === "superAdmin" ? <Outlet /> : <Navigate to="/" />;
};

export default SuperAdminOnly;
