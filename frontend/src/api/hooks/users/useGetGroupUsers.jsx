import { useQuery } from "react-query";
import useAxios from "../auth/useAxios";

const useGetGroupUsers = (id) => {
  const axios = useAxios();

  const getGroupUsersRequest = () => {
    return axios({ url: `api/groups/${id}/members/` });
  };

  const request = useQuery(["group", id,"users"], getGroupUsersRequest);

  return request;
};

export default useGetGroupUsers;
