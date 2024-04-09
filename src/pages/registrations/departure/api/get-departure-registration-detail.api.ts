import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { Departure } from "./departure.interface";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.get<Departure>(`/departure/${id}`);
};
