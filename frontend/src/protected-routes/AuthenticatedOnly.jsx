import React from "react";
import { useContext } from "react";
import AuthContext from "../context/Auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedOnly = () => {
  const { user} = useContext(AuthContext);

//   console.log(authState);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default AuthenticatedOnly;
