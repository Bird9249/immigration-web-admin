import { format } from "date-fns";
import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdatePopupForm } from "../schemas/popup.schemas";

export default async (id: string, form: UpdatePopupForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  if (form.image) formData.append("image", form.image);
  formData.append("link", form.link);
  formData.append("is_private", form.is_private ? '1' : '0');
  formData.append("start_time", format(form.duration[0], 'MM-dd-yyyy'));
  formData.append("end_time", format(form.duration[1], 'MM-dd-yyyy'));
  
  return axios.put<{ message: string }>(`/popup/${id}`, formData);
};
