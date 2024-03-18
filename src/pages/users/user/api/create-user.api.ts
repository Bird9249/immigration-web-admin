import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UserForm } from "../schemas/user.schema";

export default async (form: UserForm) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("first_name", form.firstName);
  formData.append("last_name", form.lastName);
  formData.append("image", form.image);
  formData.append("email", form.email);
  formData.append("password", form.password);
  formData.append("role_ids", form.roles.map((val) => val).join(","));

  return axios.post<{ message: string }>(`/users`, formData);
};
