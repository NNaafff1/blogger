import { createContext, useMemo } from "react";
import Axios from "axios";
import useAuth from "../hooks/useAuth";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

export const axiosContext = createContext({});

export const baseURL = "http://localhost:8000/";

const AxiosProvider = ({ children }) => {
  const { authTokens } = useAuth();
  
  const axios = useMemo(() => {
    const axios = Axios.create({
      baseURL,
      headers: {
        "Content-Type": "applications/json",
      },
    });

    axios.interceptors.request.use((config) => {
      if (authTokens?.accessToken) {
        config.headers.Authorization = `Bearer ${authTokens?.accessToken}`;
      }
      return config;
    });

    axios.interceptors.request.use(async (req) => {

      if (!authTokens?.accessToken) return req;

      const user = jwt_decode(authTokens?.accessToken);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) return req;

      const response = await axios.post(`${baseURL}/api/token/refresh/`, {
        refresh: authTokens.refresh,
      });

      //   TODO refresh in auth

      req.headers.Authorization = `Bearer ${response.data.accessToken}`;

      return req;
    });
    return axios;
  }, [authTokens]);
  return (
    <axiosContext.Provider value={axios}>{children}</axiosContext.Provider>
  );
};

export default AxiosProvider;
