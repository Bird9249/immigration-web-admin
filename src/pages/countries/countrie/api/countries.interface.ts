import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type CountriesTableState = IOffsetBasePaginate & {
  is_except_visa?: "-1" | "0" | "1";
};

export type CountryResponse = {
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

export interface CountriesResponse extends IPaginated {
  data: CountryResponse[];
}
