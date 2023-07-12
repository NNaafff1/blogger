import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/Auth/AuthContext";

const UnauthenticatedOnly = () => {
  const { user } = useContext(AuthContext);
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default UnauthenticatedOnly;
