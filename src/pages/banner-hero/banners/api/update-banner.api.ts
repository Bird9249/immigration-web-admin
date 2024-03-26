import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateBannerForm } from "../schemas/banner.schemas";

export default async (id: string, form: UpdateBannerForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  if (form.image) formData.append("image", form.image);
  formData.append("link", form.link);
  formData.append("start_time", form.start_time);
  formData.append("end_time", form.end_time);
  
  return axios.put<{ message: string }>(`/banner-hero/${id}`, formData);
};
