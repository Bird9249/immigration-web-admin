import {
    IOffsetBasePaginate,
    IPaginated,
  } from "../../../../common/interface/pagination";
  
  export type PopupTableState = IOffsetBasePaginate & {
    is_private?:string,
    is_inactive?:string
  };
  
  export type PopupResponse = {
    id: number;
    image: string;
    link: string;
    is_private: boolean;  
    start_time: string;
    end_time:string;
    created_at:string;
    updated_at:string;
  };
  
  export interface PopupsResponse extends IPaginated {
    banners: PopupResponse[];
  }
  