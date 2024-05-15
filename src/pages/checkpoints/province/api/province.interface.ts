import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type ProvinceTableState = IOffsetBasePaginate;

export type ProvinceResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  translates: {
    id: number;
    country_ids: number;
    name: string;
    slug: string;
    lang: string;
  }[];
};

export interface ProvincesResponse extends IPaginated {
  data: ProvinceResponse[];
}
