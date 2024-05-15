import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type HotelTableState = IOffsetBasePaginate & { is_published?: string };

export type HotelResponse = {
  id: number;
  image: string;
  link: string;
  link_map: string;
  phone_number: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  translates: {
    id: number;
    hotel_id: number;
    lang: string;
    name: string;
    province: string;
    district: string;
    village: string;
  }[];
  user: {
    id: number;
    created_at: string;
    updated_at: string;
    hotel_id: number;
    email: string;
    password: string;
  };
};

export interface HotelsResponse extends IPaginated {
  hotels: HotelResponse[];
}
