import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type ContactTableState = IOffsetBasePaginate;

export type ContactResponse = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
  updated_at: string;
};

export interface ContactsResponse extends IPaginated {
  contacts: ContactResponse[];
}
