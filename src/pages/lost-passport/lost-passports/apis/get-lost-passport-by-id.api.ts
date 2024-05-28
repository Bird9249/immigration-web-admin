import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { LostPassportResponse } from "./lost-passport.interface";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.get<LostPassportResponse>(`/lost-passport/${id}`);
};
