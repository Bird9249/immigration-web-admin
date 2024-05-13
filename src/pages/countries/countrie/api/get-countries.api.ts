import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { CountriesTableState, CountriesResponse } from "./countries.interface";

export default async (state: CountriesTableState) => {
  const { axios } = useAxios();

  return axios.get<CountriesResponse>("/countries", {
    params: { limit: state.limit, skip: state.offset },
  });
};
