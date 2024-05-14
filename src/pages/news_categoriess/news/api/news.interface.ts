import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type NewTableState = IOffsetBasePaginate & {
  category_id?: string;
  status?: "draft" | "published" | "private";
};

export type NewResponse = {
  id: number;
  category_id: number;
  category: {
    id: number;
    translates: {
      id: number;
      lang: "lo" | "en" | "zh_cn";
      name: string;
    }[];
  };
  thumbnail: string;
  status: "draft" | "published" | "private";
  public_at: string;
  created_at: string;
  updated_at: string;
  translates: {
    id: number;
    news_id: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    lang: string;
  }[];
};

export interface NewsResponse extends IPaginated {
  news: NewResponse[];
}
