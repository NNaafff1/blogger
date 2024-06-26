import { createContext, useMemo } from "react";
import Axios from "axios";
import useAuth from "../hooks/useAuth";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

export const axiosContext = createContext({});

export const baseURL = "http://localhost:8000/";

const AxiosProvider = ({ children }) => {
  const { authState } = useAuth();
  
  const axios = useMemo(() => {
    const axios = Axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    axios.interceptors.request.use((config) => {
      if (authState?.access) {
        config.headers.Authorization = `Bearer ${authState?.access}`;
      }
      return config;
    });

    axios.interceptors.request.use(async (req) => {

      if (!authState?.access) return req;

      const user = jwt_decode(authState?.access);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) return req;

      const response = await axios.post(`${baseURL}/api/token/refresh/`, {
        refresh: authState.refresh,
      });

      //   TODO refresh in auth

      req.headers.Authorization = `Bearer ${response.data.access}`;

      return req;
    });
    return axios;
  }, [authState]);
  return (
    <axiosContext.Provider value={axios}>{children}</axiosContext.Provider>
  );
};

export default AxiosProvider;
