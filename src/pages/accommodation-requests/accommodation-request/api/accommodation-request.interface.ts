import { Content } from "@tiptap/core";
import {
  ICursorBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type AccommodationRequestTableState = ICursorBasePaginate & {
  lang: "lo" | "en" | "zh_cn";
};

export type AccommodationRequestState = {
  id: string;
  lang: "lo" | "en" | "zh_cn";
};

export type AccommodationRequestDetailResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  lang_id: number;
  title: string;
  content: Content;
};

export type AccommodationRequestResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  translates: {
    id: number;
    title: string;
    content: object;
    lang: "lo" | "en" | "zh_cn";
  }[];
};

export interface AccommodationRequestsResponse extends IPaginated {
  data: {
    id: number;
    created_at: string;
    updated_at: string;
    lang_id: number;
    title: string;
  }[];
}
