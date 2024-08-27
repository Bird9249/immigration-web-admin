import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type CheckpointTableState = IOffsetBasePaginate & {
  category_id?: string;
  province_id?: string;
};

export type CheckpointDetailResponse = {
  id: number;
  category_id: number;
  category: {
    id: number;
    translates: {
      id: number;
      lang: "lo" | "en" | "zh_cn";
      title: string;
    }[];
  };
  province_id: number;
  country: string;
  visa: boolean;
  e_visa: boolean;
  province: {
    id: number;
    translates: { id: number; name: string; lang: "lo" | "en" | "zh_cn" }[];
  };
  image: string;
  link_map: string;
  phone_number: string;
  email: string;
  created_at: string;
  updated_at: string;
  translates: {
    id: number;
    slug: string;
    name: string;
    content: string;
    address: string;
    lang: "lo" | "en" | "zh_cn";
  }[];
};

export type CheckpointResponse = {
  id: number;
  image: string;
  phone_number: string;
  email: string;
  translates: [
    {
      id: number;
      name: string;
    }
  ];
};

export interface CheckpointsResponse extends IPaginated {
  data: CheckpointResponse[];
}
