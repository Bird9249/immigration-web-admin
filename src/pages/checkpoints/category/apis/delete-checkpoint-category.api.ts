import { useAxios } from "../../../../contexts/axios/AxiosContext";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.delete<{ message: string }>(`/checkpoint-categories/${id}`);
};
