import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type NewTableState = IOffsetBasePaginate;

export type NewResponse = {
  id: number;
  category_id: number;
  thumbnail: string;
  status: string;
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
