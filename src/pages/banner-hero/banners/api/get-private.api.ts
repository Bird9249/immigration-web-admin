import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { BannerResponse } from "./banner.interface";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.put<BannerResponse>(`/banner-hero/${id}/public`);
};
