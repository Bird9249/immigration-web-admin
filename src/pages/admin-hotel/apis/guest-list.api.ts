import { useAxios } from "../../../contexts/axios/AxiosContext";
import {
  AdminHotelsResponse,
  AdminHotelTableState,
} from "./admin-hotel.interface";

export default async (state: AdminHotelTableState) => {
  const { axios } = useAxios();

  return axios.get<AdminHotelsResponse>("/admin-hotel", {
    params: state,
  });
};
