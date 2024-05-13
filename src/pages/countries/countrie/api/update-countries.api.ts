import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateCountriesForm } from "../schemas/countries.schema";

export default async (id: string, form: UpdateCountriesForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  if (form.image) formData.append("image", form.image);
  formData.append("is_except_visa", form.is_except_visa ? "1" : "0");
  formData.append("lo", JSON.stringify(form.translates[0]));
  formData.append("en", JSON.stringify(form.translates[1]));
  formData.append("zh_cn", JSON.stringify(form.translates[2]));

  return axios.put<{ message: string }>(`/country/${id}`, formData);
};
