import { useAxios } from "../../../../contexts/axios/AxiosContext";
import {
  LostPassportsResponse,
  LostPassportTableState,
} from "./lost-passport.interface";

export default async ({ limit, cursor, lang }: LostPassportTableState) => {
  const { axios } = useAxios();

  return await axios.get<LostPassportsResponse>("/lost-passport", {
    params: { limit, cursor, lang },
  });
};
