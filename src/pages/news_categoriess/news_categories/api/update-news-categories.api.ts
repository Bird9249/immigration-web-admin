import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateNewCataegoriessForm } from "../schemas/news-categories.schema";

export default async (id: string, form: UpdateNewCataegoriessForm) => {
  const { axios } = useAxios();

  return axios.put<{ message: string }>(`/news-categories/${id}`, {
    lo: { id: form.translates[0].id, name: form.translates[0].name },
    en: { id: form.translates[1].id, name: form.translates[1].name },
    zh_cn: { id: form.translates[2].id, name: form.translates[2].name },
  });
};
