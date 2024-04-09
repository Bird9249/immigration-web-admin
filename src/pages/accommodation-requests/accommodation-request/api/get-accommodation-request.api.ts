import { useAxios } from "../../../../contexts/axios/AxiosContext";
import {
  AccommodationRequestResponse,
  AccommodationRequestTableState,
} from "./accommodation-request.interface";

export default async (state: AccommodationRequestTableState) => {
  const { axios } = useAxios();

  return axios.get<AccommodationRequestResponse>("/accommodation-request", {
    params: { limit: state.limit, skip: state.offset },
  });
};
