import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { AccommodationRequestResponse } from "./accommodation-request.interface";

export default async (id: string) => {
  const { axios } = useAxios();
  return axios.get<AccommodationRequestResponse>(
    `/accommodation-request/${id}`
  );
};
