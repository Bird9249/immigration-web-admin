import { useAxios } from "../../../contexts/axios/AxiosContext";
import { FolderSchemaType } from "../schemas/folder.schema";

export default async ({ name }: FolderSchemaType, dirId?: number) => {
  const { axios } = useAxios();

  return await axios.post<{ message: string }>(
    "/file-and-directory/directory",
    { directory_id: dirId, name }
  );
};
