import { useAxios } from "../../../../contexts/axios/AxiosContext";
import {
  NewCategoriessTableState,
  NewCategoriessResponse,
  NewsCategoriessResponse,
} from "./news-categories.interface";

export default async (state: NewCategoriessTableState) => {
  const { axios } = useAxios();

  return axios.get<NewsCategoriessResponse>("/news-categories", {
    params: { limit: state.limit, skip: state.offset },
  });
};
