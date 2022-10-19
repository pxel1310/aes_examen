import useSWR, { SWRConfiguration } from "swr";

interface IAllUsers {
  name: string;
  email: string;
}

export const useAllUsers = (config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IAllUsers>(`/api/user/allUsers`, config);
  let users = data;

  return {
    users,
    isLoadingAll: !error && !data,
    isError: error,
  };
};
