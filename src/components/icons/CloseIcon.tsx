import { Component, JSX, Match, ParentProps, Switch } from "solid-js";

interface IconProps extends ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>> {
  iconDirection?: "circle" | "circle-line";
}

const CloseIcon: Component<IconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill={`${
        props.iconDirection === "circle-line" || !props.iconDirection
          ? "none"
          : "currentColor"
      }`}
      viewBox="0 0 24 24"
    >
      <Switch
        fallback={
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18 18 6m0 12L6 6"
          />
        }
      >
        <Match when={props.iconDirection === "circle"}>
          <path
            fill-rule="evenodd"
            d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
            clip-rule="evenodd"
          />
        </Match>
        <Match when={props.iconDirection === "circle-line"}>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </Match>
      </Switch>
    </svg>
  );
};

export default CloseIcon;
