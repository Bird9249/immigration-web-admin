import { useAxios } from "../../../../contexts/axios/AxiosContext";
import {
  AccommodationRequestDetailResponse,
  AccommodationRequestState,
} from "./accommodation-request.interface";

export default async ({ id, lang }: AccommodationRequestState) => {
  const { axios } = useAxios();

  const res = await axios.get<AccommodationRequestDetailResponse>(
    `/accommodation-request/${id}/detail`,
    { params: { lang } }
  );

  return {
    ...res,
  };
};
