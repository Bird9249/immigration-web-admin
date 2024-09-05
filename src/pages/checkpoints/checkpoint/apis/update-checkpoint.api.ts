import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateCheckpointForm } from "../schemas/update-checkpoint.schema";

export default async (id: string, form: UpdateCheckpointForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("category_id", form.category_id[0]);
  formData.append("province_id", form.province_id[0]);
  if (form.country[0]) {
    formData.append("country", form.country[0]);
  }
  if (form.image) {
    formData.append("image", form.image);
  }
  formData.append("link_map", form.link_map);
  formData.append("phone_number", form.phone_number);
  formData.append("email", form.email);
  formData.append("visa", form.visa ? "true" : "false");
  formData.append("e_visa", form.e_visa ? "true" : "false");
  formData.append("lo", JSON.stringify(form.translates[0]));
  formData.append("en", JSON.stringify(form.translates[1]));
  formData.append("zh_cn", JSON.stringify(form.translates[2]));

  return axios.put<{ message: string }>(`/checkpoint/${id}`, formData);
};
