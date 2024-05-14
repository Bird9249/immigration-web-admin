import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateNewsForm } from "../schemas/news.schema";

export default async (id: string, form: UpdateNewsForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("category_id", form.category_id[0]);
  if (form.thumbnail) formData.append("thumbnail", form.thumbnail);
  formData.append("status", form.status.toString());
  formData.append("lo", String(form.translates[0]));
  formData.append("en", String(form.translates[1]));
  formData.append("zh_cn", String(form.translates[2].id));

  return axios.put<{ message: string }>(`/news/${id}`, formData);
};
