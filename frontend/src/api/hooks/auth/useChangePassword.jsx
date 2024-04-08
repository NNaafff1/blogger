import React from 'react'
import useAxios from "./useAxios";
import { useMutation } from "react-query";

const useChangePassword = () => {
  const axios = useAxios();

  const changePasswordRequest = (data) => {
    return axios({
      url: "api/auth/password/change/",
      method: "POST",
      data: data,
    });
  };

  const request = useMutation(changePasswordRequest);
  return request;
}

export default useChangePassword