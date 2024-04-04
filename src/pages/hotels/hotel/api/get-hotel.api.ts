import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { HotelTableState, HotelsResponse } from "./hotel.interface";

export default async (state: HotelTableState) => {
  const { axios } = useAxios();

  return axios.get<HotelsResponse>("/hotel", {
    params: { limit: state.limit, skip: state.offset },
  });
};
