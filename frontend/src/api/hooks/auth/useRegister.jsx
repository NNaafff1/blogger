import useAxios from "./useAxios";
import { useMutation } from "react-query";

const useRegister = () => {
  const axios  = useAxios();
  const registerRequest = (data) => {
    return axios({ url: `api/auth/register/`, data: data,method:"POST" });
  };

  const request = useMutation(registerRequest);
  return request;
};

export default useRegister;
