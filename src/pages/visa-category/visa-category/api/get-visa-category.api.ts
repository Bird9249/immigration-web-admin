import { useAxios } from "../../../../contexts/axios/AxiosContext";
import {
  VisaCategoriesResponse,
  VisaCategoryTableState,
} from "./visa-category.interface";

export default async ({ limit, cursor, lang }: VisaCategoryTableState) => {
  const { axios } = useAxios();

  return await axios.get<VisaCategoriesResponse>("/visa-category", {
    params: { limit, cursor, lang },
  });
};
