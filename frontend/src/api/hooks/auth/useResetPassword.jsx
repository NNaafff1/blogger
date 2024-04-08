import React from 'react'
import useAxios from "./useAxios";
import { useMutation } from "react-query";

const useResetPassword = () => {
 const axios = useAxios();

 const resetPasswordRequest = (data) => {
   return axios({
     url: `api/auth/password/reset/`,
     method: "POST",
     data: data,
   });
 };

 const request = useMutation(resetPasswordRequest);
 return request;
}

export default useResetPassword