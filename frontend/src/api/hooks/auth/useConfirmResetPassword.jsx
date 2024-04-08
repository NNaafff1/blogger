import React from "react";
import useAxios from "./useAxios";
import { useMutation } from "react-query";
import {useParams} from 'react-router-dom'
const useConfirmResetPassword = () => {
  const axios = useAxios();
  const { uid, token } = useParams();

  const confirmResetPasswordRequest = (data) => {
    return axios({
      url: `api/auth/password/reset/confirm/${uid}/${token}/`,
      method: "POST",
      data: {
        uid,
        token,
        new_password1: data.password,
        new_password2: data.passwordCon,
      },
    });
  };

  const request = useMutation(confirmResetPasswordRequest);
  return request;
};

export default useConfirmResetPassword;
