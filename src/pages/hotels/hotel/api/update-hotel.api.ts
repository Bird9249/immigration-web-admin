import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateHotelForm } from "../schemas/hotel.schemas";

export default async (id: string, form: UpdateHotelForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  if (form.image) formData.append("image", form.image);
  formData.append("link", form.link);
  formData.append("phone_number", form.phone_number);
  formData.append("is_published", form.is_published ? "1" : "0");
  formData.append("lo", JSON.stringify(form.translates[0]));
  formData.append("en", JSON.stringify(form.translates[1]));
  formData.append("zh_cn", JSON.stringify(form.translates[2]));

  return axios.put<{ message: string }>(`/hotel/${id}`, formData);
};
