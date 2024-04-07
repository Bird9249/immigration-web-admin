import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type AccommodationRequestTableState = IOffsetBasePaginate;

export type AccommodationRequestResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  accommodation_request_translate: {
    id: number;
    accommodation_request_id: number;
    title: string;
    content: string;
    lang: string;
  }[];
};

export interface AccommodationRequestsResponse extends IPaginated {
  accommodation_requests: AccommodationRequestResponse[];
}
