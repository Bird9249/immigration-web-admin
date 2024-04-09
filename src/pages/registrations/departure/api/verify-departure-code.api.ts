import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { VerifyDepartureCodeSchemaType } from "../schemas/verify-departure-code.schema";

export default async (form: VerifyDepartureCodeSchemaType) => {
  const { axios } = useAxios();

  return await axios.post<{ message: string }>("/departure", form);
};
