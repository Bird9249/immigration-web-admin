import {
    IOffsetBasePaginate,
    IPaginated,
  } from "../../../../common/interface/pagination";
  
  export type BannerTableState = IOffsetBasePaginate;
  
  export type BannerResponse = {
    id: number;
    image: string;
    link: string;
    is_private: boolean;
    start_time: string;
    end_time:string;
    created_at:string;
    updated_at:string;
    banners_translate:{
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
  