import  { createContext } from "react";
import { useReducer } from "react";
import { authActions, authInitialState, authReducer } from "./AuthUtils";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState);
  const navigate = useNavigate();

  let loginUser = async ({ email, password }) => {
    try {
      let response = await axios.post(
        "http://localhost:8000/api/token/",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let data = response.data;

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: authActions.SUCCESS_LOGIN,
          payload: { authState: data },
        });
        navigate("/");
      }
    } catch (e) {
      dispatch({ type: authActions.FAIL_LOGIN, payload: e });
    }
  };

  let logoutUser = () => {
    dispatch({ type: authActions.LOGOUT });
    navigate("/login");
  };

  let contextData = {
    authState: authState.authState,
    loginUser: loginUser,
    authDispatch: dispatch,
    logoutUser,
    authError: authState.error,
    user: authState.user,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
