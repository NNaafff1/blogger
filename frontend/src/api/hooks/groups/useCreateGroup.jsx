import { useMutation } from "react-query";
import useAxios from "../auth/useAxios";

const useCreateGroup = () => {
  const axios = useAxios();

  const createGroupsRequest = (data) => {
    return axios({ url: "api/groups/", data: data, method: "POST" });
  };

  const request = useMutation(createGroupsRequest);
  return request;
};

export default useCreateGroup;
