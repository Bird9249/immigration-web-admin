import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { VerifyArrivalCodeSchemaType } from "../schemas/verify-arrival-code.schema";

export default async (form: VerifyArrivalCodeSchemaType) => {
  const { axios } = useAxios();

  return await axios.post<{
    id: number;
    entry_name: string;
    purpose: string;
    traveling_by_type: string;
    traveling_by_no: string;
    is_traveling_in_tour: boolean;
    verification_code: string;
    verified_at: string;
    black_list: "available" | "unavailable";
    created_at: string;
    updated_at: string;
  }>("/arrival/scan", form);
};
