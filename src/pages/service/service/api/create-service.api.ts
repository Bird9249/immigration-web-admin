import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { CreateServiceSchemaType } from "../schemas/create-service.schemas";

export default async (form: CreateServiceSchemaType) => {
  const { axios } = useAxios();

  return axios.post<{ message: string }>(`/services`, {
    lo: form.translates[0],
    en: form.translates[1],
    zh_cn: form.translates[2],
  });
};
