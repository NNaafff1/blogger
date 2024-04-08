import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthenticatedOnly = () => {
  const { user } = useAuth();

//   console.log(authState);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default AuthenticatedOnly;
