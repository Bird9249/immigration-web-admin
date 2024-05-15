import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { HotelForm } from "../schemas/hotel.schemas";

export default async (form: HotelForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("image", form.image);
  formData.append("link", form.link);
  formData.append("phone_number", form.phone_number);
  formData.append("is_published", form.is_published ? "1" : "0");
  formData.append("lo", JSON.stringify(form.translates[0]));
  formData.append("en", JSON.stringify(form.translates[1]));
  formData.append("zh_cn", JSON.stringify(form.translates[2]));
  if (form.user) {
    formData.append("user", JSON.stringify(form.user));
  }

  return axios.post<{ message: string }>(`/hotel`, formData);
};
