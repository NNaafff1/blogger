import React from "react";
import useAxios from "../auth/useAxios";
import { useMutation, useQuery } from "react-query";

const useListBlogComments = ({ blog_id }) => {
  const axios = useAxios();

  const listBlogCommentsRequest = () => {
    return axios({
      url: `api/blogs/${blog_id}/comments`,
    });
  };

  const request = useQuery(["comments", blog_id], listBlogCommentsRequest);
  return request;
};

export default useListBlogComments;
