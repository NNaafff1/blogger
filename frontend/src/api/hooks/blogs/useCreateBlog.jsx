import useAxios from "../auth/useAxios";
import { useMutation } from "react-query";

const useCreateBlog = ({ groupId }) => {
  const axios = useAxios();

  const createBlogRequest = (data) => {
    return axios({
      url: `api/groups/${groupId}/blogs/`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const request = useMutation(createBlogRequest);

  return request;
};

export default useCreateBlog;
