import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { CountriesForm } from "../schemas/countries.schema";

export default async (form: CountriesForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("image", form.image);
  formData.append("is_except_visa", form.is_except_visa ? "1" : "0");
  formData.append("lo", JSON.stringify(form.translates[0]));
  formData.append("en", JSON.stringify(form.translates[1]));
  formData.append("zh_cn", JSON.stringify(form.translates[2]));

  return axios.post<{ message: string }>(`/country`, formData);
};
