import { JSX, Match, ParentProps, Switch } from "solid-js";

interface IconProps extends ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>> {
  iconDirection?: "ordered";
}

export default function (props: IconProps) {
  return (
    <>
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <Switch>
          <Match when={!props.iconDirection}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"
            />
          </Match>
          <Match when={props.iconDirection === "ordered"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"
            />
          </Match>
        </Switch>
      </svg>
    </>
  );
}
