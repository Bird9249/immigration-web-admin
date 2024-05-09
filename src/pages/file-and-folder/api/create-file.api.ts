import { useAxios } from "../../../contexts/axios/AxiosContext";
import { FileSchemaType } from "../schemas/file.schema";

export default async ({ file }: FileSchemaType, dirId?: number) => {
  const { axios } = useAxios();

  const formData = new FormData();
  formData.append("directory_id", String(dirId));
  formData.append("file", file);

  return await axios.post<{ message: string }>(
    "/file-and-directory/file",
    formData
  );
};
