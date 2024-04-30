import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { VisaCategoryResponse } from "./visa-category.interface";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.get<VisaCategoryResponse>(`/visa-category/${id}`);
};
