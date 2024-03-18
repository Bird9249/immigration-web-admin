import { useAxios } from "../axios/AxiosContext";

export default async () => {
  const { axios } = useAxios();

  return await axios.post<{ message: string }>("auth/logout");
};
