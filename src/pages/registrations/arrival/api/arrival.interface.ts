import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type ArrivalTableState = IOffsetBasePaginate & {
  entry_name?: string;
  passport_number?: string;
  visa_number?: string;
  is_verified?: "verified" | "no_verified";
  black_list?: "available" | "unavailable";
  verification_code?: string;
};

export type ListArrival = {
  id: number;
  entry_name: string;
  black_list: "available" | "unavailable";
  verification_code: string;
  verified_at?: string;
  created_at: string;
  passport_information: {
    id: number;
    number: string;
  };
  visa_information: {
    id: number;
    number: string;
  };
};

export type Arrival = {
  id: number;
  entry_name: string;
  purpose:
    | "diplomatic"
    | "official"
    | "visit"
    | "business"
    | "tourism"
    | "transit";
  traveling_by_type: "flight" | "car" | "bus";
  traveling_by_no: string;
  traveling_from: string;
  is_traveling_in_tour: false;
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
  visa_information: {
    id: number;
    number: string;
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
    race: string;
  };
  intended_address: {
    id: number;
    name: string;
    province: string;
    district: string;
    village: string;
    check_in: string;
    check_out: string;
  }[];
};

export interface ArrivalPaginatedResponse extends IPaginated {
  data: ListArrival[];
}
