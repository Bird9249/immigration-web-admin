import { JSXElement, ParentProps } from "solid-js";

export type ColumnPropsType = ParentProps<{
  field?: string;
  header?: string;
  body?: (data: any) => JSXElement;
}>;
