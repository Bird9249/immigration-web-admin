import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { ProvinceTableState, ProvincesResponse } from "./province.interface";

export default async (state: ProvinceTableState) => {
  const { axios } = useAxios();

  return axios.get<ProvincesResponse>("/provinces", {
    params: state,
  });
};
