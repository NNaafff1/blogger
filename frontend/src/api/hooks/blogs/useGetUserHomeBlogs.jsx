import React from "react";
import useAxios from "../auth/useAxios";
import { useQuery } from "react-query";

const useGetUserHomeBlogs = ({ config } = { config: {} }) => {
  const axios = useAxios();

  const getUserHomeBlogsRequest = () => {
    return axios({ url: `api/users/home-blogs/` });
  };

  const request = useQuery(["blogs", "home"], getUserHomeBlogsRequest);

  return request;
};

export default useGetUserHomeBlogs;
