import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/Auth/AuthContext";

const AdminOnly = () => {
  const { authState } = useContext(AuthContext);

  console.log(authState);
  
  return authState?.role === "admin" || authState?.role === "superAdmin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default AdminOnly;
