import { AxiosResponse } from "axios";
import { JSXElement, Resource } from "solid-js";
import { IPaginated } from "../../common/interface/pagination";
import { ColumnPropsType } from "./column/Column.interface";

type Res = Record<string, any> & IPaginated;

export type TableProps = {
  header?: JSXElement;
  children: ColumnPropsType[];
  value: Resource<AxiosResponse<Res, any>>;
  responseField: string;
  onChange: (state: TableState) => void;
};

export interface TableState {
  paginate: { offset: number; limit: number };
}
