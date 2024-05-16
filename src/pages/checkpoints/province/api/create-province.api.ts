import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { ProvinceForm } from "../schemas/province.schemas";

export default async (form: ProvinceForm) => {
  const { axios } = useAxios();

  return axios.post<{ message: string }>(`/provinces`, {
    country_ids: form.country_ids.map((val) => Number(val)),
    lo: form.translates[0],
    en: form.translates[1],
    zh_cn: form.translates[2],
  });
};
