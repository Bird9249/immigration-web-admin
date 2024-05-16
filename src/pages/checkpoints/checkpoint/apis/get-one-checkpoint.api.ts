import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { CheckpointDetailResponse } from "./checkpoint.interface";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.get<CheckpointDetailResponse>(`/checkpoint/${id}`);
};
