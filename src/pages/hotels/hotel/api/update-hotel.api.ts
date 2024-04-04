import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateHotelForm } from "../schemas/hotel.schemas";

export default async (
  id: string,
  form: UpdateHotelForm,
  transitionIds: { loId: number; enId: number; zhCnId: number }
) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("latitude", form.latitude);
  formData.append("longitude", form.longitude);
  formData.append("link", form.link);
  formData.append("phone_number", form.phone_number);
  formData.append("is_published", form.is_published ? "1" : "0");
  formData.append("lo_id", transitionIds.loId.toString());
  formData.append("lo_name", form.lo.name);
  formData.append("lo_address", form.lo.address);
  formData.append("en_id", transitionIds.enId.toString());
  formData.append("en_name", form.en.name);
  formData.append("en_address", form.en.address);
  formData.append("zn_cn_id", transitionIds.zhCnId.toString());
  formData.append("zn_cn_name", form.zn_CN.name);
  formData.append("zn_cn_address", form.zn_CN.address);

  return axios.put<{ message: string }>(`/hotel/${id}`, formData);
};
