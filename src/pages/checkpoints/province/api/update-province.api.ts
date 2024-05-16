import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateProvincesForm } from "../schemas/province.schemas";

export default async (id: string, form: UpdateProvincesForm) => {
  const { axios } = useAxios();

  return axios.put<{ message: string }>(`/provinces/${id}`, {
    country_ids: form.country_ids.map((val) => Number(val)),
    lo: form.translates[0],
    en: form.translates[1],
    zh_cn: form.translates[2],
  });
};
