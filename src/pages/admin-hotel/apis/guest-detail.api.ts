import { useAxios } from "../../../contexts/axios/AxiosContext";
import { AdminHotelDetailResponse } from "./admin-hotel.interface";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.get<AdminHotelDetailResponse>(`/admin-hotel/${id}`);
};
