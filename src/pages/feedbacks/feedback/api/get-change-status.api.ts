import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { FeedbacksResponse } from "./feedback.inteface";

export default async (id: number, isPrivate: boolean) => {
  const { axios } = useAxios();

  return axios.put<FeedbacksResponse>(`/feedback/${id}/change-status`, {
    is_private: isPrivate,
  });
};