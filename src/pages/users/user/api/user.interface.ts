import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type UserTableState = IOffsetBasePaginate;

export type UserResponse = {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  profile: {
    id: number;
    first_name: string;
    last_name: string;
    image: string;
    created_at: string;
    updated_at: string;
  };
  roles: {
    id: number;
    name: string;
    description: string;
    is_default: boolean;
    created_at: string;
    updated_at: string;
  }[];
  session?: {
    id: string;
    created_at: string;
  };
};

export interface UsersResponse extends IPaginated {
  users: UserResponse[];
}
