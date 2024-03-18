import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { RoleForm } from "../schemas/role.schema";

export default async (form: RoleForm) => {
  const { axios } = useAxios();

  const data: any = {
    ...form,
    permission_ids: form.permissions.map((val) => Number(val)),
  };

  delete data.permissions;

  return axios.post<{ message: string }>(`/roles`, data);
};
