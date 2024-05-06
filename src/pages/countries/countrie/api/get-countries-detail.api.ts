import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { CountriesResponse } from "./countries.interface";

export default async (id: string) => {
  const { axios } = useAxios();
  return axios.get<CountriesResponse>(`/countries/${id}`);
};
