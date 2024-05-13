import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { NumberResponse } from "./number.interface";

export default () => {
  const { axios } = useAxios();

  return axios.get<NumberResponse>(`/no-of-tourists/exit`);
};
