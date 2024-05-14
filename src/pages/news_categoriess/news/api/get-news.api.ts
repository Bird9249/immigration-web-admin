import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { NewTableState, NewResponse } from "./news.interface";

export default async (state: NewTableState) => {
  const { axios } = useAxios();

  return axios.get<NewResponse>("/news", {
    params: { limit: state.limit, skip: state.offset },
  });
};
