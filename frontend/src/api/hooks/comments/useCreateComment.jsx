import useAxios from "../auth/useAxios";
import { useMutation } from "react-query";


const useCreateComment = () => {
  const axios = useAxios();

  const createCommentRequest = ({ blog_id, data }) => {
    return axios({
      url: `api/blogs/${blog_id}/comments/`,
      method: "POST",
      data:data,
    });
  };

  const request = useMutation(createCommentRequest);
  return request;
};

export default useCreateComment;
