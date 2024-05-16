import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { CheckpointCategoryDetailResponse } from "./checkpoint-category.interface";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.get<CheckpointCategoryDetailResponse>(
    `/checkpoint-categories/${id}`
  );
};
