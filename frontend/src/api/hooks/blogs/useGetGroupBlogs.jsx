import { useQuery } from "react-query";
import useAxios from "../auth/useAxios";

const useGetGroupBlogs = (id) => {
  const axios = useAxios();

  const getGroupBlogsRequest = () => {
    return axios({ url: `api/groups/${id}/blogs/` });
  };

  const request = useQuery(["group", id, "blogs"], getGroupBlogsRequest);

  return request;
};

export default useGetGroupBlogs;
