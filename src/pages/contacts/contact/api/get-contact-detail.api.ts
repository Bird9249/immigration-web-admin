import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { ContactResponse } from "./contact.interface";

export default async (id: string) => {
  const { axios } = useAxios();

  return axios.get<ContactResponse>(`/contacts/${id}`);
};
