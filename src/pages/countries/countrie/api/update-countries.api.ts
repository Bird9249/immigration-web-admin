import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateCountriesForm } from "../schemas/countries.schema";

export default async (id: string, form: UpdateCountriesForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  if (form.image) formData.append("image", form.image);
  formData.append("is_except_visa", !form.is_except_visa ? "1" : "0");
  formData.append("lo_id", String(form.translates[0].id));
  formData.append("lo_name", form.translates[0].name);
  formData.append("lo_description", form.translates[0].description);
  formData.append("en_id", String(form.translates[1].id));
  formData.append("en_name", form.translates[1].name);
  formData.append("en_description", form.translates[1].description);
  formData.append("zh_cn_id", String(form.translates[2].id));
  formData.append("zh_cn_name", form.translates[2].name);
  formData.append("zh_cn_description", form.translates[2].description);

  return axios.put<{ message: string }>(`/countries/${id}`, formData);
};
