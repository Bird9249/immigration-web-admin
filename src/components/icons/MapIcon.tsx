import { JSX, Match, ParentProps, Switch } from "solid-js";

interface EyeIconProps
  extends ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>> {
  iconDirection?: "line" | "alt" | "alt-line";
}

export default function (props: EyeIconProps) {
  return (
    <>
      <svg
        {...props}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill={`${
          props.iconDirection === "line" || props.iconDirection === "alt-line"
            ? "none"
            : "currentColor"
        }`}
        viewBox="0 0 24 24"
      >
        <Switch
          fallback={
            <path
              fill-rule="evenodd"
              d="M5 9a7 7 0 1 1 8 6.93V21a1 1 0 1 1-2 0v-5.07A7.001 7.001 0 0 1 5 9Zm5.94-1.06A1.5 1.5 0 0 1 12 7.5a1 1 0 1 0 0-2A3.5 3.5 0 0 0 8.5 9a1 1 0 0 0 2 0c0-.398.158-.78.44-1.06Z"
              clip-rule="evenodd"
            />
          }
        >
          <Match when={props.iconDirection === "line"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 0v6M9.5 9A2.5 2.5 0 0 1 12 6.5"
            />
          </Match>
          <Match when={props.iconDirection === "alt"}>
            <path
              fill-rule="evenodd"
              d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
              clip-rule="evenodd"
            />
          </Match>
          <Match when={props.iconDirection === "alt-line"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            />
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
            />
          </Match>
        </Switch>
      </svg>
    </>
  );
}
