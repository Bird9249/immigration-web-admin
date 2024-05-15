import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type CheckpointCategoryTableState = IOffsetBasePaginate;

export type CheckpointCategoryDetailResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  translates: {
    id: number;
    title: string;
    description: string;
    lang: "lo" | "en" | "zh_cn";
  }[];
};

export type CheckpointCategoryResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  translates: {
    id: number;
    title: string;
    lang: "lo" | "en" | "zh_cn";
  }[];
};

export interface CheckpointCategoriesResponse extends IPaginated {
  data: CheckpointCategoryResponse[];
}
