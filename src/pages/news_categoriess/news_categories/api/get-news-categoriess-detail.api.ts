import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { NewCategoriessResponse } from "./news-categories.interface";

export default async (id: string) => {
  const { axios } = useAxios();
  return axios.get<NewCategoriessResponse>(`/news-categories/${id}`);
};
