import React from 'react'
import useAxios from './useAxios'
import { useMutation } from "react-query";
const useResendVerification = () => {
  const axios = useAxios();

  const resendVerificationRequest = (data)=>{
    return axios({
      url: "api/auth/resend-email/",
      method: "POST",
      data: data,
    });
  }

  const request = useMutation(resendVerificationRequest);
  return request;
}

export default useResendVerification