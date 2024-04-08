import useAxios from "../auth/useAxios";
import { useQuery } from "react-query";

const useGetUserBlogs = ({ id, options }) => {
  const axios = useAxios();

  const getUserBlogs = () => {
    return axios({ url: `api/users/${id}/blogs` });
  };

  const request = useQuery(["users", id, "blogs"], getUserBlogs, options);

  return request;
};

export default useGetUserBlogs;
