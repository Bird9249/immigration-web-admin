import { format } from "date-fns";
import { DateTimeFormatForSave } from "../../../common/enum/date-time-fomat-for-save.enum";
import { useAxios } from "../../../contexts/axios/AxiosContext";
import { CheckInGuestSchemaType } from "../schemas/check-in.schema";

export default async (form: CheckInGuestSchemaType) => {
  const { axios } = useAxios();

  return await axios.post<{ message: string }>(`/admin-hotel`, {
    ...form,
    check_in: format(form.check[0], DateTimeFormatForSave.Timestamp),
    check_out: format(form.check[1], DateTimeFormatForSave.Timestamp),
  });
};
