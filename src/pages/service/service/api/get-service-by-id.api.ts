import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { ServiceDetailResponse } from "./service.interface";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.get<ServiceDetailResponse>(`/services/${id}`);
};
