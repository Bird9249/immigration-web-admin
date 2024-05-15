import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateProvincesForm } from "../schemas/province.schemas";

export default async (id: string, form: UpdateProvincesForm) => {
  const { axios } = useAxios();

  return axios.put<{ message: string }>(`/provinces/${id}`, {
    lo: { id: form.translates[0].id, name: form.translates[0].name },
    en: { id: form.translates[1].id, name: form.translates[1].name },
    zh_cn: { id: form.translates[2].id, name: form.translates[2].name },
  });
};
