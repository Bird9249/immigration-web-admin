import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateNewCataegoriessForm } from "../schemas/news-categories.schema";

export default async (id: string, form: UpdateNewCataegoriessForm) => {
  const { axios } = useAxios();

  const formData = new FormData();

  formData.append("lo_id", String(form.translates[0].id));
  formData.append("lo_name", form.translates[0].name);
  formData.append("en_id", String(form.translates[1].id));
  formData.append("en_name", form.translates[1].name);
  formData.append("zh_cn_id", String(form.translates[2].id));
  formData.append("zh_name", form.translates[2].name);

  return axios.put<{ message: string }>(`/news-categories/${id}`, formData);
};
