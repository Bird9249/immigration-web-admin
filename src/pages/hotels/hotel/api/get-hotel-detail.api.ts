import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { HotelResponse } from "./hotel.interface";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.get<HotelResponse>(`/hotel/${id}`);
};
