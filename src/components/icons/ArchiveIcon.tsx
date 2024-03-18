import { JSX, Match, ParentProps, Switch } from "solid-js";

interface AngleIconProps
  extends ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>> {
  iconDirection?: "line" | "download" | "download-line";
}

export default function (props: AngleIconProps) {
  return (
    <>
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill={`${
          props.iconDirection === "line" ||
          props.iconDirection === "download-line"
            ? "none"
            : "currentColor"
        }`}
        viewBox="0 0 24 24"
      >
        <Switch
          fallback={
            <>
              <path
                fill-rule="evenodd"
                d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1c0 .6-.4 1-1 1h-4a1 1 0 0 1-1-1Z"
                clip-rule="evenodd"
              />
              <path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
            </>
          }
        >
          <Match when={props.iconDirection === "line"}>
            <path
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 12v1h4v-1m4 7H6a1 1 0 0 1-1-1V9h14v9a1 1 0 0 1-1 1ZM4 5h16c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V6c0-.6.4-1 1-1Z"
            />
          </Match>
          <Match when={props.iconDirection === "download"}>
            <path
              fill-rule="evenodd"
              d="M4 4a2 2 0 1 0 0 4h16a2 2 0 1 0 0-4H4Zm0 6h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Zm10.7 5.7a1 1 0 0 0-1.4-1.4l-.3.3V12a1 1 0 1 0-2 0v2.6l-.3-.3a1 1 0 0 0-1.4 1.4l2 2a1 1 0 0 0 1.4 0l2-2Z"
              clip-rule="evenodd"
            />
          </Match>
          <Match when={props.iconDirection === "download-line"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 11v5m0 0 2-2m-2 2-2-2M3 6v1c0 .6.4 1 1 1h16c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H4a1 1 0 0 0-1 1Zm2 2v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V8H5Z"
            />
          </Match>
        </Switch>
      </svg>
    </>
  );
}
