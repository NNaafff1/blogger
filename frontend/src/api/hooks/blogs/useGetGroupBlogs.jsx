import { useQuery } from "react-query";
import useAxios from "../auth/useAxios";

const useGetGroupBlogs = ({ id, params }) => {
  const axios = useAxios();

  const getGroupBlogsRequest = () => {
    return axios({
      url: `api/groups/${id}/blogs/?page_size=${params.page_size}`,
    });
  };

  const request = useQuery(
    ["group", id, "blogs", params.page_size],
    getGroupBlogsRequest
  );

  return request;
};

export default useGetGroupBlogs;
