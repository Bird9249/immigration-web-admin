import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { HotelResponse } from "./hotel.interface";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.put<HotelResponse>(`/hotel/${id}/private`);
};
