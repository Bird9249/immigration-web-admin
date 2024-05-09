import { useAxios } from "../../../../contexts/axios/AxiosContext";
import {
  DeparturePaginatedResponse,
  DepartureTableState,
} from "./departure.interface";

export default async (params: DepartureTableState) => {
  const { axios } = useAxios();

  return axios.get<DeparturePaginatedResponse>("/departure", {
    params: {
      ...params,
      verification_code: params.verification_code?.toUpperCase(),
    },
  });
};
