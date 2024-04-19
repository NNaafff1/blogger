import { useQuery } from "react-query";
import useAxios from "../auth/useAxios";

const useGetGroupUsers = ({ id, params }) => {
  const axios = useAxios();

  const getGroupUsersRequest = () => {
    return axios({
      url: `api/groups/${id}/members?page_size=${params.page_aize}`,
    });
  };

  const request = useQuery(
    ["group", id, "users", params.page_aize],
    getGroupUsersRequest
  );

  return request;
};

export default useGetGroupUsers;
