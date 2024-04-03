import { Transition } from "solid-transition-group";
import { format } from "date-fns";
import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateBannerForm } from "../schemas/banner.schemas";

export default async (
  id: string,
  form: UpdateBannerForm,
  transitionIds: { loId: number; enId: number; zhCnId: number }
) => {
  const { axios } = useAxios();
  const formData = new FormData();
  if (form.image) formData.append("image", form.image);
  formData.append("link", form.link);
  formData.append("start_time", format(form.duration["0"], "MM-dd-yyyy"));
  formData.append("end_time", format(form.duration["1"], "MM-dd-yyyy"));
  formData.append("is_private", form.is_private ? "1" : "0");
  formData.append("lo_id", transitionIds.loId.toString());
  formData.append("lo_title", form.lo.title);
  formData.append("lo_description", form.lo.description);
  formData.append("en_id", transitionIds.enId.toString());
  formData.append("en_title", form.en.title);
  formData.append("en_description", form.en.description);
  formData.append("zh_cn_id", transitionIds.zhCnId.toString());
  formData.append("zh_cn_title", form.zh_CN.title);
  formData.append("zh_cn_description", form.zh_CN.description);

  return axios.put<{ message: string }>(`/banner-hero/${id}`, formData);
};
