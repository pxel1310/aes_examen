import useSWR, { SWRConfiguration } from "swr";
import {ICipher} from "../interfaces";

export const useAllUsers = ( config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<ICipher>(`/api/user/allUsers`, config);
  let users = data

  return {
    users,
    isLoadingAll: !error && !data,
    isError: error,
  };
};
