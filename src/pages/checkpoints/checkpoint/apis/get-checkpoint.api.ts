import { useAxios } from "../../../../contexts/axios/AxiosContext";
import {
  CheckpointsResponse,
  CheckpointTableState,
} from "./checkpoint.interface";

export default async (state: CheckpointTableState) => {
  const { axios } = useAxios();

  return axios.get<CheckpointsResponse>("/checkpoint", {
    params: state,
  });
};
