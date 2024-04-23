import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { HotelTableState, HotelsResponse } from "./hotel.interface";

export default async ({ is_published, offset, limit }: HotelTableState) => {
  const { axios } = useAxios();

  return axios.get<HotelsResponse>("/hotel", {
    params: { limit, offset, is_published },
  });
};
