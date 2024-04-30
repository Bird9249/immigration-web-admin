import { IOrderBy } from "./order-by";

export interface IOffsetBasePaginate extends IOrderBy {
  offset?: number;
  limit?: number;
}

export interface ICursorBasePaginate {
  cursor: string;
  limit: number;
  length: number;
}

export interface IPaginated {
  total: number;
}
