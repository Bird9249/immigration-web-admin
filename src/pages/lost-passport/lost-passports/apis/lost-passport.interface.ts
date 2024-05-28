import { Content } from "@tiptap/core";
import {
  ICursorBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type LostPassportTableState = ICursorBasePaginate & {
  lang: "lo" | "en" | "zh_cn";
} & LostPassportsResponse;

export type LostPassportState = {
  id: string;
  lang: "lo" | "en" | "zh_cn";
};

export type LostPassportDetailResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  lang_id: number;
  title: string;
  content: Content;
};

export type LostPassportResponse = {
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

export interface LostPassportsResponse extends IPaginated {
  data: {
    id: number;
    created_at: string;
    updated_at: string;
    lang_id: number;
    title: string;
  }[];
}
