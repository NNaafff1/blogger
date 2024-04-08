import useAxios from "./useAxios";
import { useMutation } from "react-query";

const useLogin = () => {
  const axios = useAxios();
  const userRequest = (data) => {
    return axios({ url: `api/auth/login/`, data: data, method: "POST" });
  };

  const request = useMutation(userRequest);
  return request;
};

export default useLogin;
