import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateServiceSchemaType } from "../schemas/update-service.schema";

export default async (id: string, form: UpdateServiceSchemaType) => {
  const { axios } = useAxios();

  return axios.put<{ message: string }>(`/services/${id}`, {
    lo: form.translates[0],
    en: form.translates[1],
    zh_cn: form.translates[2],
  });
};
