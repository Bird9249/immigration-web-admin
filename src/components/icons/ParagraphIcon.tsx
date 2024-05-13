import { JSX, Match, ParentProps, Switch } from "solid-js";

interface IconProps extends ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>> {
  iconDirection?: "line";
}

export default function (props: IconProps) {
  return (
    <>
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill={!props.iconDirection ? "currentColor" : "none"}
        viewBox="0 0 24 24"
      >
        <Switch>
          <Match when={!props.iconDirection}>
            <path
              fill-rule="evenodd"
              d="M8.5 4a4.5 4.5 0 0 0 0 9H11v6a1 1 0 1 0 2 0V6h2v13a1 1 0 1 0 2 0V6h2a1 1 0 1 0 0-2H8.5Z"
              clip-rule="evenodd"
            />
          </Match>
          <Match when={props.iconDirection === "line"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 5v7m0 7v-7m4-7v14m3-14H8.5A3.5 3.5 0 0 0 5 8.5v0A3.5 3.5 0 0 0 8.5 12H12"
            />
          </Match>
        </Switch>
      </svg>
    </>
  );
}
