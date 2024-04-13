import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateAccommodationRequestSchemaType } from "../schemas/update-accommodation-request.schema";

export default async (
  id: string,
  form: UpdateAccommodationRequestSchemaType
) => {
  const { axios } = useAxios();

  return axios.put<{ message: string }>(`/accommodation-request/${id}`, {
    lo: form.translates[0],
    en: form.translates[1],
    zh_cn: form.translates[2],
  });
};
