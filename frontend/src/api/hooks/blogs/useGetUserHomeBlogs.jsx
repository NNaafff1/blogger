import React from "react";
import useAxios from "../auth/useAxios";
import { useQuery } from "react-query";

const useGetUserHomeBlogs = ({ params } = { params: {} }) => {
  const axios = useAxios();

  const getUserHomeBlogsRequest = () => {
    return axios({ url: `api/blogs/home?page_size=${params.page_size}` });
  };

  const request = useQuery(
    ["blogs", "home", params.page_size],
    getUserHomeBlogsRequest
  );

  return request;
};

export default useGetUserHomeBlogs;
