import { useAxios } from "../../../../contexts/axios/AxiosContext";
import {
  ArrivalPaginatedResponse,
  ArrivalTableState,
} from "./arrival.interface";

export default async (params: ArrivalTableState) => {
  const { axios } = useAxios();

  return axios.get<ArrivalPaginatedResponse>("/arrival", {
    params: {
      ...params,
      verification_code: params.verification_code?.toUpperCase(),
    },
  });
};
