import { useAxios } from "../../../contexts/axios/AxiosContext";

export default async (id: string) => {
  const { axios } = useAxios();

  return await axios.delete<{ message: string }>(
    `/file-and-directory/${id}/file`
  );
};
