import { useAxios } from "../../../../contexts/axios/AxiosContext";
import {
  NewCategoriessTableState,
  NewCategoriessResponse,
} from "./news-categories.interface";

export default async (state: NewCategoriessTableState) => {
  const { axios } = useAxios();

  return axios.get<NewCategoriessResponse>("/news-categories", {
    params: { limit: state.limit, skip: state.offset },
  });
};
