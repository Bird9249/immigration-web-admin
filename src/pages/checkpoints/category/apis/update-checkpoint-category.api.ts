import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateCheckpointCategoryForm } from "../schemas/update-checkpoint-category.schema";

export default async (id: string, form: UpdateCheckpointCategoryForm) => {
  const { axios } = useAxios();

  return axios.put<{ message: string }>(`/checkpoint-categories/${id}`, {
    lo: form.translates[0],
    en: form.translates[1],
    zh_cn: form.translates[2],
  });
};
