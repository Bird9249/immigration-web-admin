import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { FeedbackResponse } from "./feedback.inteface";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.get<FeedbackResponse>(`/feedback/${id}`);
};
