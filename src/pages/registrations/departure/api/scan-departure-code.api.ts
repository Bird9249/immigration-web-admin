import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { VerifyDepartureCodeSchemaType } from "../schemas/verify-departure-code.schema";

export default async (form: VerifyDepartureCodeSchemaType) => {
  const { axios } = useAxios();

  return await axios.post<{
    id: number;
    departure_name: string;
    last_leaving: string;
    verification_code: string;
    verified_at: string;
    black_list: "available" | "unavailable";
    created_at: string;
    updated_at: string;
  }>("/departure/scan", form);
};
