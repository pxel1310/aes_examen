import useSWR, { SWRConfiguration } from "swr";
import { ICipher } from "../interfaces";

export const useEliminarC = (url: string, config: SWRConfiguration = {}) => {
  // Api post
  const { data, error } = useSWR<ICipher>(`/api/eliminar/${url}`, config);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
