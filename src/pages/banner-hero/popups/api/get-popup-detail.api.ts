import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { PopupResponse} from "./popup.interface";

export default async (id: string) => {
  const { axios } = useAxios();
  return axios.get<PopupResponse>(`/popup/${id}`);
};
