import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { CreateLostPassportSchemaType } from "../schemas/create-lost-passport.schemas";

export default async (form: CreateLostPassportSchemaType) => {
  const { axios } = useAxios();

  return axios.post<{ message: string }>(`/lost-passport`, {
    lo: form.translates[0],
    en: form.translates[1],
    zh_cn: form.translates[2],
  });
};
