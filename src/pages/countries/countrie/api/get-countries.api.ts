import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { CountriesResponse, CountriesTableState } from "./countries.interface";

export default async (params: CountriesTableState) => {
  const { axios } = useAxios();

  return axios.get<CountriesResponse>("/country", {
    params: {
      ...params,
      is_except_visa:
        params.is_except_visa === "-1" ? undefined : params.is_except_visa,
    },
  });
};
