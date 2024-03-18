import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export interface RoleTableState extends IOffsetBasePaginate {}

export interface RoleResponse {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  permissions: {
    id: number;
    name: string;
    group_name: string;
    description: string;
    created_at: string;
  }[];
}

export interface RolesResponse extends IPaginated {
  data: Omit<RoleResponse, "permissions">[];
}
