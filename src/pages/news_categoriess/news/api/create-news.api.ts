import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { NewsForm } from "../schemas/news.schema";

export default async (form: NewsForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("thumbnail", form.thumbnail);
  formData.append("status", form.status);
  formData.append("public_at", form.public_at);
  formData.append("lo_title", form.translates[0].title);
  formData.append("lo_description", form.translates[0].description);
  formData.append("lo_content", form.translates[0].content);
  formData.append("en_title", form.translates[1].title);
  formData.append("en_description", form.translates[1].description);
  formData.append("en_content", form.translates[1].content);
  formData.append("zh_cn_titel", form.translates[2].title);
  formData.append("zh_cn_description", form.translates[2].description);
  formData.append("zh_cn_content", form.translates[2].content);

  return axios.post<{ message: string }>(`/news`, formData);
};
