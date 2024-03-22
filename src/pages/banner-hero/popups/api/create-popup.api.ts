import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { PopupForm } from "../schemas/popup.schemas";

export default async (form: PopupForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("image", form.image);
  formData.append("link", form.link);
  formData.append("start_time", form.start_time);
  formData.append("end_time", form.end_time);
  
  return axios.post<{ message: string }>(`/popup`, formData);
};
