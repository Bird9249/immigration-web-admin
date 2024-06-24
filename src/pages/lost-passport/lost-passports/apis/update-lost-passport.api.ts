import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateLostPassportSchemaType } from "../schemas/update-lost-passport.schema";

export default async (id: string, form: UpdateLostPassportSchemaType) => {
  const { axios } = useAxios();

  return axios.put<{ message: string }>(`/lost-passport/${id}`, {
    lo: form.translates[0],
    en: form.translates[1],
    zh_cn: form.translates[2],
  });
};
