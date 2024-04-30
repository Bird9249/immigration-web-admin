import { Content } from "@tiptap/core";
import {
  ICursorBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type VisaCategoryTableState = ICursorBasePaginate & {
  lang: "lo" | "en" | "zh_cn";
} & VisaCategoriesResponse;

export type VisaCategoryState = {
  id: string;
  lang: "lo" | "en" | "zh_cn";
};

export type VisaCategoryDetailResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  lang_id: number;
  name: string;
  content: Content;
};

export type VisaCategoryResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  translates: {
    id: number;
    name: string;
    content: object;
    lang: "lo" | "en" | "zh_cn";
  }[];
};

export interface VisaCategoriesResponse extends IPaginated {
  data: {
    id: number;
    created_at: string;
    updated_at: string;
    lang_id: number;
    name: string;
  }[];
}
