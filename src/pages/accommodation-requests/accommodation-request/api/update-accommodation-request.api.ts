import { UpdateAccommodationRequestForm } from "../schemas/accommodation_request.schemas";
import { useAxios } from "../../../../contexts/axios/AxiosContext";

export default async (
  id: string,
  form: UpdateAccommodationRequestForm,
  transitionIds: { loId: number; enId: number; zhCnId: number }
) => {
  const { axios } = useAxios();
  const formData = new FormData();
  formData.append("lo_id", transitionIds.loId.toString());
  formData.append("lo_title", form.lo.title);
  formData.append("lo_content", form.lo.content);
  formData.append("en_id", transitionIds.enId.toString());
  formData.append("en_title", form.en.title);
  formData.append("en_content", form.en.content);
  formData.append("zh_cn_id", transitionIds.zhCnId.toString());
  formData.append("zh_cn_title", form.zh_CN.title);
  formData.append("zh_cn_content", form.zh_CN.content);

  return axios.put<{ message: string }>(
    `/accommodation-request/${id}`,
    formData
  );
};
