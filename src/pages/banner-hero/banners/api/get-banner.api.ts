import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { BannerTableState, BannersResponse } from "./banner.interface";

export default async (state: BannerTableState) => {
  const { axios } = useAxios();

  return axios.get<BannersResponse>("/banner-hero", {
    params: { limit: state.limit, skip: state.offset },
  });
};
