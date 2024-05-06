import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type CountriesTableState = IOffsetBasePaginate;

export type CountriesResponse = {
  id: number;
  image: string;
  is_except_visa: boolean;
  created_at: string;
  updated_at: string;
  translates: {
    id: number;
    country_id: number;
    name: string;
    slug: string;
    lang: string;
    description: string;
  }[];
};

export interface CountriessResponse extends IPaginated {
  countries: CountriesResponse[];
}
