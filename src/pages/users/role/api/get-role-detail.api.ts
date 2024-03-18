import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { RoleResponse } from "./role.interface";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.get<RoleResponse>(`/roles/${id}`);
};
