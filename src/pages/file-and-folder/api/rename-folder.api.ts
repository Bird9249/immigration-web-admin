import { useAxios } from "../../../contexts/axios/AxiosContext";
import { FolderSchemaType } from "../schemas/folder.schema";

export default async (
  id: number,
  { name }: FolderSchemaType,
  dirId?: number
) => {
  const { axios } = useAxios();

  return await axios.put<{ message: string }>(
    `/file-and-directory/${id}/directory`,
    {
      directory_id: dirId,
      name,
    }
  );
};
