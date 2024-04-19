import React from "react";
import useAxios from "../auth/useAxios";
import { useMutation, useQueryClient } from "react-query";

const useDeleteBlog = () => {
  const axios = useAxios();

  const quiryClient = useQueryClient();

  const deleteBlogRequist = (blogId) => {
    return axios({
      url: `api/blogs/${blogId}`,
      method: "DELETE",
    });
  };

  const request = useMutation({
    mutationFn: deleteBlogRequist,
    onSuccess: () => {
      quiryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  return request;
};

export default useDeleteBlog;
