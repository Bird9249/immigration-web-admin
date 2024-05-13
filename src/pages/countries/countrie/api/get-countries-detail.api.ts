import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { CountryResponse } from "./countries.interface";

export default async (id: string) => {
  const { axios } = useAxios();
  return axios.get<CountryResponse>(`/country/${id}`);
};
