import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { ServiceDetailResponse, ServiceState } from "./service.interface";

export default async ({ id, lang }: ServiceState) => {
  const { axios } = useAxios();

  const res = await axios.get<ServiceDetailResponse>(`/services/${id}/detail`, {
    params: { lang },
  });

  return {
    ...res,
  };
};
