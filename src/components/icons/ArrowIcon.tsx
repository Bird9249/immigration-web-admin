import { JSX, Match, ParentProps, Switch } from "solid-js";

interface IconProps extends ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>> {
  iconDirection:
    | "down"
    | "down-to-bracket"
    | "left"
    | "left-to-bracket"
    | "right"
    | "right-alt"
    | "right-alt-line"
    | "right-bracket"
    | "sort-letters"
    | "up"
    | "up-from-bracket"
    | "up-right-down-left"
    | "repeat"
    | "repeat-count";
}

export default function (props: IconProps) {
  return (
    <>
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill={props.iconDirection === "right-alt" ? "currentColor" : "none"}
        viewBox="0 0 24 24"
      >
        <Switch>
          <Match when={props.iconDirection === "down"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19V5m0 14-4-4m4 4 4-4"
            />
          </Match>
          <Match when={props.iconDirection === "down-to-bracket"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
            />
          </Match>
          <Match when={props.iconDirection === "left"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </Match>
          <Match when={props.iconDirection === "left-to-bracket"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
            />
          </Match>
          <Match when={props.iconDirection === "right"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </Match>
          <Match when={props.iconDirection === "right-alt"}>
            <path
              fill-rule="evenodd"
              d="M3 4a1 1 0 0 0-.8 1.6L6.6 12l-4.4 6.4A1 1 0 0 0 3 20h13.2c.3 0 .6-.2.8-.4l4.8-7a1 1 0 0 0 0-1.2l-4.8-7a1 1 0 0 0-.8-.4H3Z"
              clip-rule="evenodd"
            />
          </Match>
          <Match when={props.iconDirection === "right-alt-line"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m16.2 19 4.8-7-4.8-7H3l4.8 7L3 19h13.2Z"
            />
          </Match>
          <Match when={props.iconDirection === "right-bracket"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
            />
          </Match>
          <Match when={props.iconDirection === "sort-letters"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4"
            />
          </Match>
          <Match when={props.iconDirection === "up"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v13m0-13 4 4m-4-4-4 4"
            />
          </Match>
          <Match when={props.iconDirection === "up-from-bracket"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"
            />
          </Match>
          <Match when={props.iconDirection === "up-right-down-left"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 4h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5"
            />
          </Match>
          <Match when={props.iconDirection === "repeat"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"
            />
          </Match>
          <Match when={props.iconDirection === "repeat-count"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m16 4 3 3H5v3m3 10-3-3h14v-3m-9-2.5 2-1.5v4"
            />
          </Match>
        </Switch>
      </svg>
    </>
  );
}
