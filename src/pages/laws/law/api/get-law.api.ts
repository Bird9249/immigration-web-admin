import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { LawTableState, LawResponse } from "./law.interface";

export default async (state: LawTableState) => {
  const { axios } = useAxios();

  return axios.get<LawResponse>("/law", {
    params: { limit: state.limit, skip: state.offset },
  });
};
