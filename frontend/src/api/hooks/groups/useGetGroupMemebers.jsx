import { useQuery } from "react-query";
import useAxios from "../auth/useAxios";

const useGetGroupMemebers = (id) => {
  const axios = useAxios();

  const getGroupMemebersRequest = () => {
    return axios({ url: `api/groups/${id}/members` });
  };

  const request = useQuery(["group", id, "members"], getGroupMemebersRequest);
  return request;
};

export default useGetGroupMemebers;
