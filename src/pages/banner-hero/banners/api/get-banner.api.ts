import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { BannerTableState, BannersResponse } from "./banner.interface";

export default async ({is_inactive, is_private,offset, limit}: BannerTableState) => {
  const { axios } = useAxios();

  return axios.get<BannersResponse>("/banner-hero", {
    params: { limit, offset, is_inactive, is_private },
  });
};
