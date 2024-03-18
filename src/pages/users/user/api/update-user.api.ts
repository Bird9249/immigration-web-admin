import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UpdateUserForm } from "../schemas/user.schema";

export default async (id: string, form: UpdateUserForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("first_name", form.firstName);
  formData.append("last_name", form.lastName);
  if (form.image) formData.append("image", form.image);
  formData.append("email", form.email);
  if (form.password) formData.append("password", form.password);
  formData.append("role_ids", form.roles.map((val) => val).join(","));

  return axios.put<{ message: string }>(`/users/${id}`, formData);
};
