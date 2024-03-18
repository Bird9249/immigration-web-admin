import { JSX, Match, ParentProps, Switch } from "solid-js";

interface AngleIconProps
  extends ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>> {
  iconDirection?: "circle" | "circle-line";
}

export default function (props: AngleIconProps) {
  return (
    <>
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill={`${
          props.iconDirection === "circle-line" ? "none" : "currentColor"
        }`}
        viewBox="0 0 20 20"
      >
        <Switch
          fallback={
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            />
          }
        >
          <Match when={props.iconDirection === "circle"}>
            <path
              fill-rule="evenodd"
              d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4.2a1 1 0 1 0-2 0V11H7.8a1 1 0 1 0 0 2H11v3.2a1 1 0 1 0 2 0V13h3.2a1 1 0 1 0 0-2H13V7.8Z"
              clip-rule="evenodd"
            />
          </Match>
          <Match when={props.iconDirection === "circle-line"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </Match>
        </Switch>
      </svg>
    </>
  );
}
