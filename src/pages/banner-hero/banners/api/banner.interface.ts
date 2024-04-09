import {
    IOffsetBasePaginate,
    IPaginated,
  } from "../../../../common/interface/pagination";
  
  export type BannerTableState = IOffsetBasePaginate & {
    is_private?:string,
    is_inactive?:string
  };
  
  export type BannerResponse = {
    id: number;
    image: string;
    link: string;
    is_private: boolean;
    start_time: string;
    end_time:string;
    created_at:string;
    updated_at:string;
    translates:{
      id: number;
      banner_id:number;
      lang:string;
      title:string;
      description:string;
    }[];
  };
  
  export interface BannersResponse extends IPaginated {
    banners: BannerResponse[];
  }
  