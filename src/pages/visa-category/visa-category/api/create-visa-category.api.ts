import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { CreateVisaCategorySchemaType } from "../schemas/create-visa-category.schemas";

export default async (form: CreateVisaCategorySchemaType) => {
  const { axios } = useAxios();

  return axios.post<{ message: string }>(`/visa-category`, {
    lo: form.translates[0],
    en: form.translates[1],
    zh_cn: form.translates[2],
  });
};
