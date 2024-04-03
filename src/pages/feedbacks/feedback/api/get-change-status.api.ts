import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { FeedbacksResponse } from "./feedback.inteface";

export default async (id: number, is_published: boolean) => {
  const { axios } = useAxios();

  return axios.put<FeedbacksResponse>(`/feedback/${id}`, {
    is_published: is_published,
  });
};
