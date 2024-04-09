import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { VerifyArrivalCodeSchemaType } from "../schemas/verify-arrival-code.schema";

export default async (form: VerifyArrivalCodeSchemaType) => {
  const { axios } = useAxios();

  return await axios.post<{ message: string }>("/arrival", form);
};
