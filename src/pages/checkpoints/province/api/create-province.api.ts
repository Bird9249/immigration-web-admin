import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { ProvinceForm } from "../schemas/province.schemas";

export default async (form: ProvinceForm) => {
  const { axios } = useAxios();

  return await axios.post<{ message: string }>(`/provinces`, {
    countries: form.countries,
    lo: form.translates[0],
    en: form.translates[1],
    zh_cn: form.translates[2],
  });
};
