import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../common/interface/pagination";

export type AdminHotelTableState = IOffsetBasePaginate & {
  room_no?: string;
  check_in?: string;
  check_out?: string;
};

export type AdminHotelDetailResponse = {
  id: number;
  check_in: string;
  check_out: string;
  room_no: string;
  arrival_registration: {
    id: number;
    personal_information: {
      id: number;
      family_name: string;
      name: string;
      gender: string;
      date_of_birth: string;
      place_of_birth: string;
      nationality: string;
      occupation: string;
      phone_number: string;
    };
    passport_information: {
      id: number;
      number: string;
      expiry_date: string;
      date_issue: string;
      place_issue: string;
      image: string;
    };
    visa_information: {
      id: number;
      number: string;
      date_issue: string;
      place_issue: string;
      image: string;
    };
  };
};

export interface AdminHotelResponse {
  id: number;
  check_in: string;
  check_out: string;
  room_no: string;
  personal_information: {
    id: number;
    family_name: string;
    name: string;
    gender: string;
  };
}

export interface AdminHotelsResponse extends IPaginated {
  hotels: AdminHotelResponse[];
}
