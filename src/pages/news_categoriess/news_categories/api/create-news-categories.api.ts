import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { NewCataegoriessForm } from "../schemas/news-categories.schema";

export default async (form: NewCataegoriessForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("lo_name", form.translates[0].name);
  formData.append("en_name", form.translates[1].name);
  formData.append("zh_name", form.translates[2].name);

  return axios.post<{ message: string }>(`/news-categories`, formData);
};
