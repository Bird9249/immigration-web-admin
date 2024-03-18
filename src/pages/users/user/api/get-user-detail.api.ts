import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UserResponse } from "./user.interface";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.get<UserResponse>(`/users/${id}`);
};
