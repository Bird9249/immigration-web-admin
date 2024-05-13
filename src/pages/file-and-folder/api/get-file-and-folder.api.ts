import { useAxios } from "../../../contexts/axios/AxiosContext";
import {
  FileAndFolderResponse,
  FileAndFolderState,
} from "./file-and-folder.interface";

export default async ({ parent_id }: FileAndFolderState) => {
  const { axios } = useAxios();

  return await axios.get<FileAndFolderResponse[]>("/file-and-directory", {
    params: { parent_id },
  });
};
