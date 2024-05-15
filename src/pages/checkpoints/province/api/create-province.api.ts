import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { ProvinceForm } from "../schemas/province.schemas";

export default async (form: ProvinceForm) => {
  const { axios } = useAxios();

  return axios.post<{ message: string }>(`/provinces`, {
    lo: { name: form.translates[0].name },
    en: { name: form.translates[1].name },
    zh_cn: { name: form.translates[2].name },
  });
};
