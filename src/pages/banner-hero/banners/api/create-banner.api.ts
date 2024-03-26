import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { BannerForm } from "../schemas/banner.schemas";

export default async (form: BannerForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("image", form.image);
  formData.append("link", form.link);
  formData.append("start_time", form.start_time);
  formData.append("end_time", form.end_time);
  
  return axios.post<{ message: string }>(`/banner-hero`, formData);
};
