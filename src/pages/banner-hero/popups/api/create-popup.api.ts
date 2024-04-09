import { format } from "date-fns";
import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { PopupForm } from "../schemas/popup.schemas";

export default async (form: PopupForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("image", form.image);
  formData.append("link", form.link);
  formData.append("start_time", format(form.duration[0], 'MM-dd-yyyy'));
  formData.append("end_time", format(form.duration[1], 'MM-dd-yyyy'));
  formData.append("is_private", form.is_private ? '1' : '0');
  
  return axios.post<{ message: string }>(`/popup`, formData);
};
