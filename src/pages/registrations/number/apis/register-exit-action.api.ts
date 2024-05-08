import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { NumberSchemaType } from "../schemas/number.schema";

export default async (
  form: NumberSchemaType,
  action: "increment" | "decrement"
) => {
  const { axios } = useAxios();

  return await axios.post<{ message: string }>(
    `/no-of-register/exit/${action}`,
    form
  );
};
