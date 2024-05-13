import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { AccommodationRequestState } from "../../../accommodation-requests/accommodation-request/api/accommodation-request.interface";
import { VisaCategoryDetailResponse } from "./visa-category.interface";

export default async ({ id, lang }: AccommodationRequestState) => {
  const { axios } = useAxios();

  const res = await axios.get<VisaCategoryDetailResponse>(
    `/visa-category/${id}/detail`,
    { params: { lang } }
  );

  return {
    ...res,
  };
};
