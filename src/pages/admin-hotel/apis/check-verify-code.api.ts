import { useAxios } from "../../../contexts/axios/AxiosContext";

export default async (code: string) => {
  const { axios } = useAxios();

  return await axios.get<{ message: string }>(
    `/admin-hotel/${code}/verify-code`
  );
};
