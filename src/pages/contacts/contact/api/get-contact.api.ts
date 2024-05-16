import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { ContactsResponse, ContactTableState } from "./contact.interface";

export default async (state: ContactTableState) => {
  const { axios } = useAxios();

  return axios.get<ContactsResponse>("/contact", {
    params: state,
  });
};
