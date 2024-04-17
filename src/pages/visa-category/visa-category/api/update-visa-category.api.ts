import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateVisaCategorySchemaType } from "../schemas/update-visa-category.schema";

export default async (id: string, form: UpdateVisaCategorySchemaType) => {
  const { axios } = useAxios();

  return axios.put<{ message: string }>(`/visa-category/${id}`, {
    lo: form.translates[0],
    en: form.translates[1],
    zh_cn: form.translates[2],
  });
};
