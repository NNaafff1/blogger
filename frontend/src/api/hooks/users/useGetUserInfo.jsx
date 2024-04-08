import { useQuery } from "react-query";
import useAxios from "../auth/useAxios";

const useGetUserInfo = ({ id, config }) => {
  const axios = useAxios();

  const getUserInfo = () => {
    return axios({ url: `api/users/${id}` });
  };

  const request = useQuery(["users", id], getUserInfo, config);

  return request;
};

export default useGetUserInfo;
