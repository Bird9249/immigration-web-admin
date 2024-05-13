import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { LawForm } from "../schemas/law.shema";

export default async (form: LawForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("file", form.file);

  return axios.post<{ message: string }>(`/law`, formData);
};
