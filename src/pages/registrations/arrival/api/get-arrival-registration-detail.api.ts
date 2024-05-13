import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { Arrival } from "./arrival.interface";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.get<Arrival>(`/arrival/${id}`);
};
