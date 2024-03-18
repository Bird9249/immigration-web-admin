import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { RoleTableState, RolesResponse } from "./role.interface";

export default async (state: RoleTableState) => {
  const { axios } = useAxios();

  return axios.get<RolesResponse>("roles", {
    params: {
      limit: state.limit,
      offset: state.offset,
    },
  });
};
