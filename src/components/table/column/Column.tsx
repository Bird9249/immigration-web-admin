import { ColumnPropsType } from "./column.interface";

export default (props: ColumnPropsType) => {
  return (
    <th scope="col" class="px-4 py-3">
      {props.header ? props.header.toUpperCase() : undefined}
    </th>
  );
};
