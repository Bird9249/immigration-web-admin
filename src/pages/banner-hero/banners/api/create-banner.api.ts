import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { BannerForm } from "../schemas/banner.schemas";

export default async (form: BannerForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("image", form.image);
  formData.append("link", form.link);
  formData.append("start_time", form.duration[0]);
  formData.append("end_time", form.duration[1]);
  formData.append("is_private", form.is_private ? "1" : "0");
  formData.append("lo_title", form.lo.title);
  formData.append("lo_description", form.lo.description);
  formData.append("en_title", form.en.title);
  formData.append("en_description", form.en.description);
  formData.append("zh_cn_title", form.zh_CN.title);
  formData.append("zh_cn_description", form.zh_CN.description);

  return axios.post<{ message: string }>(`/banner-hero`, formData);
};
