import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { NewsResponse, NewTableState } from "./news.interface";

export default async (state: NewTableState) => {
  const { axios } = useAxios();

  return axios.get<NewsResponse>("/news", {
    params: state,
  });
};
