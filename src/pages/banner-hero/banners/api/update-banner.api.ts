import { format } from "date-fns";
import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateBannerForm } from "../schemas/banner.schemas";

export default async (id: string, form: UpdateBannerForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  if (form.image) formData.append("image", form.image);
  formData.append("link", form.link);
  formData.append("start_time", format(form.duration["0"], "MM-dd-yyyy"));
  formData.append("end_time", format(form.duration["1"], "MM-dd-yyyy"));
  formData.append("is_private", !form.is_private ? "1" : "0");
  formData.append("lo_id", String(form.translates[0].id));
  formData.append("lo_title", form.translates[0].title);
  formData.append("lo_description", form.translates[0].description);
  formData.append("en_id", String(form.translates[1].id));
  formData.append("en_title", form.translates[1].title);
  formData.append("en_description", form.translates[1].description);
  formData.append("zh_cn_id", String(form.translates[2].id));
  formData.append("zh_cn_title", form.translates[2].title);
  formData.append("zh_cn_description", form.translates[2].description);

  return axios.put<{ message: string }>(`/banner-hero/${id}`, formData);
};
