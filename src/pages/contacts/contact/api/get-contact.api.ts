import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { ContactTableState, ContactResponse } from "./contact.interface";

export default async (state: ContactTableState) => {
  const { axios } = useAxios();

  return axios.get<ContactResponse>("/contacts", {
    params: { limit: state.limit, skip: state.offset },
  });
};
