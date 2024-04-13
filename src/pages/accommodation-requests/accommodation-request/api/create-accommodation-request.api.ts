import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { CreateAccommodationRequestSchemaType } from "../schemas/create-accommodation-request.schemas";

export default async (form: CreateAccommodationRequestSchemaType) => {
  const { axios } = useAxios();

  return axios.post<{ message: string }>(`/accommodation-request`, {
    lo: form.translates[0],
    en: form.translates[1],
    zh_cn: form.translates[2],
  });
};
