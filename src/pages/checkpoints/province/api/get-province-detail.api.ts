import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { ProvinceResponse } from "./province.interface";

export default async (id: string) => {
  const { axios } = useAxios();
  return axios.get<ProvinceResponse>(`/provinces/${id}`);
};
