import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { NewCataegoriessForm } from "../schemas/news-categories.schema";

export default async (form: NewCataegoriessForm) => {
  const { axios } = useAxios();

  return axios.post<{ message: string }>(`/news-categories`, {
    lo: { name: form.translates[0].name },
    en: { name: form.translates[1].name },
    zh_cn: { name: form.translates[2].name },
  });
};
