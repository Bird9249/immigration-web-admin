import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateLawForm } from "../schemas/law.shema";

export default async (id: string, form: UpdateLawForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("name", form.name);
  if (form.file) formData.append("file", form.file);

  return axios.put<{ message: string }>(`/law/${id}`, formData);
};
