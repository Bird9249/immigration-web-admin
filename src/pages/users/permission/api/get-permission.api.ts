import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { PermissionResponse } from "./permission.interface";

export default async () => {
  const { axios } = useAxios();

  return axios.get<PermissionResponse[]>("/permissions");
};
