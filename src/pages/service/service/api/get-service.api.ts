import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { ServiceResponse, ServiceTableState } from "./service.interface";

export default async ({ limit, offset, lang }: ServiceTableState) => {
  const { axios } = useAxios();

  return await axios.get<ServiceResponse>("/services", {
    params: { limit, offset, lang },
  });
};
