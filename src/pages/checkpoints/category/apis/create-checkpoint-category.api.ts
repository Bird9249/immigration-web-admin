import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { CreateCheckpointCategoryForm } from "../schemas/create-checkpoint-category.schema";

export default async (form: CreateCheckpointCategoryForm) => {
  const { axios } = useAxios();

  return axios.post<{ message: string }>(`/checkpoint-categories`, {
    lo: form.translates[0],
    en: form.translates[1],
    zh_cn: form.translates[2],
  });
};
