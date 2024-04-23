import { useAxios } from "../../../../contexts/axios/AxiosContext";

export default async (id: number, isStatus: boolean) => {
  const { axios } = useAxios();
  if (!isStatus) {
    return await axios.put<{ message: string }>(`/hotel/${id}/public`);
  } else {
    return await axios.put<{ message: string }>(`/hotel/${id}/private`);
  }
};
