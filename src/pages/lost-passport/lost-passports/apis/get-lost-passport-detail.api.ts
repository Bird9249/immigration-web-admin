import { useAxios } from "../../../../contexts/axios/AxiosContext";
import {
  LostPassportDetailResponse,
  LostPassportState,
} from "./lost-passport.interface";

export default async ({ id, lang }: LostPassportState) => {
  const { axios } = useAxios();

  const res = await axios.get<LostPassportDetailResponse>(
    `/lost-passport/${id}/detail`,
    { params: { lang } }
  );

  return {
    ...res,
  };
};
