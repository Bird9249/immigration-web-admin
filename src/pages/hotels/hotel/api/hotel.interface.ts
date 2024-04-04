import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type HotelTableState = IOffsetBasePaginate;

export type HotelResponse = {
  id: number;
  latitude: string;
  longitude: string;
  image: string;
  link: string;
  phone_number: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  translates: {
    id: number;
    hotel_id: number;
    lang: string;
    name: string;
    address: string;
  }[];
};

export interface HotelsResponse extends IPaginated {
  hotels: HotelResponse[];
}
