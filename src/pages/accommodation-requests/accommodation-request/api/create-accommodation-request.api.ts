import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { AccommodationRequestForm } from "../schemas/accommodation_request.schemas";

export default async (form: AccommodationRequestForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("lo_title", form.lo.title);
  formData.append("lo_content", form.lo.content);
  formData.append("en_title", form.en.title);
  formData.append("en_content", form.en.content);
  formData.append("zh_cn_title", form.zh_CN.title);
  formData.append("zh_cn_content", form.zh_CN.content);

  return axios.post<{ message: string }>(`/accommodation-request`, formData);
};
