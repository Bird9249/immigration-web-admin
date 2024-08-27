import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export type ServiceTableState = IOffsetBasePaginate & {
  lang: "lo" | "en" | "zh_cn";
};

export type ServiceState = {
  id: string;
  lang: "lo" | "en" | "zh_cn";
};

export type ServiceDetailResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  translates: {
    id: number;
    description: string;
    lang: "zh_cn" | "lo" | "en";
    title: string;
    content: unknown;
    service_id: number;
  }[];
};

export type ServiceResponse = {
  lang_id: number;
  title: string;
  id: number;
  created_at: string;
  updated_at: string;
};

export interface ServicesResponse extends IPaginated {
  data: ServiceResponse[];
}
