import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { LawResponse } from "./law.interface";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.get<LawResponse>(`/law/${id}`);
};
