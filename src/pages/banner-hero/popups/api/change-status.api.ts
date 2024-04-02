import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { PopupsResponse } from "./popup.interface";

export default async (id: number, isPrivate: boolean) => {
  const { axios } = useAxios();

  return axios.put<PopupsResponse>(`/popup/${id}/change-status`, {
    is_private: isPrivate,
  });
};
