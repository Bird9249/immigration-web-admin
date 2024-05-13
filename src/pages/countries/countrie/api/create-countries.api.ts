import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { CountriesForm } from "../schemas/countries.schema";

export default async (form: CountriesForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("image", form.image);
  formData.append("is_except_visa", form.is_except_visa ? "0" : "1");
  formData.append("lo_name", form.translates[0].name);
  formData.append("lo_description", form.translates[0].description);
  formData.append("en_name", form.translates[1].name);
  formData.append("en_description", form.translates[1].description);
  formData.append("zh_cn_name", form.translates[2].name);
  formData.append("zh_cn_description", form.translates[2].description);

  return axios.post<{ message: string }>(`/countries`, formData);
};
