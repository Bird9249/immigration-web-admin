import { JSX, ParentProps, Show } from "solid-js";

interface IconProps extends ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>> {
  iconDirection: "line";
}

export default function (props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill={props.iconDirection === "line" ? "none" : "currentColor"}
      viewBox="0 0 24 24"
    >
      <Show
        when={props.iconDirection === "line"}
        fallback={
          <path
            fill-rule="evenodd"
            d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z"
            clip-rule="evenodd"
          />
        }
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 13V8m0 8h0m9-4a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </Show>
    </svg>
  );
}
