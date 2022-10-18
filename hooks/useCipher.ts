import useSWR, { SWRConfiguration } from "swr";
import {ICipher} from "../interfaces";

export const useCipher = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<ICipher>(`/api/cipher/${url}`, config);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
