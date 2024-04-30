import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { HotelForm } from "../schemas/hotel.schemas";

export default async (form: HotelForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("image", form.image);
  formData.append("link", form.link);
  formData.append("map_link", form.map_link);
  formData.append("phone_number", form.phone_number);
  formData.append("is_published", form.is_published ? "1" : "0");
  formData.append("lo_name", form.translates[0].name);
  formData.append("lo_address", form.translates[0].address);
  formData.append("en_name", form.translates[1].name);
  formData.append("en_address", form.translates[1].address);
  formData.append("zh_name", form.translates[2].name);
  formData.append("zh_address", form.translates[2].address);

  return axios.post<{ message: string }>(`/hotel`, formData);
};
