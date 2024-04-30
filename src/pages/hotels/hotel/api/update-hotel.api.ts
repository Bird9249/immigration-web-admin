import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateHotelForm } from "../schemas/hotel.schemas";

export default async (id: string, form: UpdateHotelForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("link", form.link);
  formData.append("map_link", form.map_link);
  formData.append("phone_number", form.phone_number);
  formData.append("is_published", form.is_published ? "1" : "0");
  formData.append("lo_id", String(form.translates[0].id));
  formData.append("lo_name", form.translates[0].name);
  formData.append("lo_address", form.translates[0].address);
  formData.append("en_id", String(form.translates[1].id));
  formData.append("en_name", form.translates[1].name);
  formData.append("en_address", form.translates[1].address);
  formData.append("zh_cn_id", String(form.translates[2].id));
  formData.append("zh_name", form.translates[2].name);
  formData.append("zh_address", form.translates[2].address);

  return axios.put<{ message: string }>(`/hotel/${id}`, formData);
};
