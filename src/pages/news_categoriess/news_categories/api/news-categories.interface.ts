import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type NewCategoriessTableState = IOffsetBasePaginate;

export type NewCategoriessResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  translates: {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    lang: string;
  }[];
};

export interface NewsCategoriessResponse extends IPaginated {
  newsCatagoriess: NewCategoriessResponse[];
}
