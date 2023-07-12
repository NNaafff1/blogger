import jwt_decode from "jwt-decode";

export const authInitialState = {
  authState: localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null,
  isLoading: true,
  error: null,
  user: localStorage.getItem("authTokens")
    ? jwt_decode(JSON.parse(localStorage.getItem("authTokens")).access)
    : null,
};

export const authActions = {
  SUCCESS_LOGIN: "SUCCESS_LOGIN",
  FAIL_LOGIN: "FAIL_LOGIN",
  LOGOUT: "LOGOUT",
  REFRESH_TOKEN: "REFRESH_TOKEN",
};

export function authReducer(state, action) {
  switch (action.type) {
    case authActions.SUCCESS_LOGIN: {
      const authState = action.payload.authState;
      localStorage.setItem("authTokens", JSON.stringify(authState));
      return {
        ...state,
        authState,
        user: jwt_decode(authState.access),
        isLoading: false,
      };
    }

    case authActions.FAIL_LOGIN:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case authActions.LOGOUT:
      localStorage.removeItem("authTokens");
      return {
        ...state,
        user: null,
        authState: null,
      };

    case authActions.REFRESH_TOKEN: {
      const tokens = action.payload;
      localStorage.setItem("authTokens", JSON.stringify(tokens));
      return {
        state,
        user: jwt_decode(tokens.access),
        authState: tokens,
      };
    }

    default:
      return state;
  }
}
