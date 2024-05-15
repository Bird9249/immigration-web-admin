import { useAxios } from "../../../../contexts/axios/AxiosContext";
import {
  CheckpointCategoriesResponse,
  CheckpointCategoryTableState,
} from "./checkpoint-category.interface";

export default async (state: CheckpointCategoryTableState) => {
  const { axios } = useAxios();

  return axios.get<CheckpointCategoriesResponse>("/checkpoint-categories", {
    params: state,
  });
};
