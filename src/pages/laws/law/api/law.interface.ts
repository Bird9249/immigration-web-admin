import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type LawTableState = IOffsetBasePaginate;

export type LawResponse = {
  id: number;
  name: string;
  file: string;
  created_at: string;
  updated_at: string;
};

export interface LawsResponse extends IPaginated {
  laws: LawResponse[];
}
