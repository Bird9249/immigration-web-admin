import { useAxios } from "../../../../contexts/axios/AxiosContext";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.delete<{ message: string }>(`/banner-hero/${id}`);
};
