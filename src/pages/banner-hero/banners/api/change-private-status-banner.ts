import { useAxios } from "../../../../contexts/axios/AxiosContext";

export default async (id: number, isPrivate: boolean) => {
  const { axios } = useAxios();

  if (!isPrivate) {
    return await axios.put<{ message: string }>(`/banner-hero/${id}/public`);
  } else {
    return await axios.put<{ message: string }>(`/banner-hero/${id}/private`);
  }
};
