import { useAxios } from "../../../../contexts/axios/AxiosContext";
import {
  AccommodationRequestsResponse,
  AccommodationRequestTableState,
} from "./accommodation-request.interface";

export default async ({
  limit,
  cursor,
  lang,
}: AccommodationRequestTableState) => {
  const { axios } = useAxios();

  return axios.get<AccommodationRequestsResponse>("/accommodation-request", {
    params: { limit, cursor, lang },
  });
};
