import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { FeedbackTableState, FeedbacksResponse } from "./feedback.inteface";

export default async (state: FeedbackTableState) => {
  const { axios } = useAxios();

  return axios.get<FeedbacksResponse>("/feedback", {
    params: { limit: state.limit, skip: state.offset },
  });
};
