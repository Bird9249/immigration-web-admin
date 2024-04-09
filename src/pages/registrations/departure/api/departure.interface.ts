import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type DepartureTableState = IOffsetBasePaginate & {
  entry_name?: string;
  passport_number?: string;
  is_verified?: "verified" | "no_verified";
  black_list?: "available" | "unavailable";
  verification_code?: string;
};
export type Departure = {
  id: number;
  departure_name: string;
  last_leaving: string;
  verification_code?: string;
  verified_at?: string;
  black_list: "available" | "unavailable";
  created_at: string;
  updated_at: string;
  passport_information: {
    id: number;
    number: string;
    expiry_date: string;
    date_issue: string;
    place_issue: string;
    image: string;
    created_at: string;
    updated_at: string;
  };
  personal_information: {
    id: number;
    family_name: string;
    name: string;
    gender: "male" | "female";
    date_of_birth: string;
    place_of_birth: string;
    nationality: string;
    occupation: string;
    phone_number: string;
  };
};

export type ListDeparture = {
  id: number;
  departure_name: string;
  black_list: string;
  verification_code: string;
  verified_at?: string;
  created_at: string;
  passport_information: {
    id: number;
    number: string;
  };
};

export interface DeparturePaginatedResponse extends IPaginated {
  data: ListDeparture[];
}
