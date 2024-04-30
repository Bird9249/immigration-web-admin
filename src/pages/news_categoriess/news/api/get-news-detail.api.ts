import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { NewResponse } from "./news.interface";

export default async (id: string) => {
  const { axios } = useAxios();
  return axios.get<NewResponse>(`/news/${id}`);
};
