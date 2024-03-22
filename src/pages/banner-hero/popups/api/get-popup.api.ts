import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { PopupTableState, PopupsResponse } from "./popup.interface";

export default async (state: PopupTableState) => {
  const { axios } = useAxios();

  return axios.get<PopupsResponse>("/popup", {
    params: { limit: state.limit, skip: state.offset },
  });
};
