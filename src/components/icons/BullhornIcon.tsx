import { Component, JSX, Match, ParentProps, Switch } from "solid-js";

interface IconProps extends ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>> {
  iconDirection?: "line";
}

const CloseIcon: Component<IconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill={`${props.iconDirection === "line" ? "none" : "currentColor"}`}
      viewBox="0 0 24 24"
    >
      <Switch
        fallback={
          <path
            fill-rule="evenodd"
            d="M18.458 3.11A1 1 0 0 1 19 4v16a1 1 0 0 1-1.581.814L12 16.944V7.056l5.419-3.87a1 1 0 0 1 1.039-.076ZM22 12c0 1.48-.804 2.773-2 3.465v-6.93c1.196.692 2 1.984 2 3.465ZM10 8H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6V8Zm0 9H5v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3Z"
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
            d="M11 9H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6m0-6v6m0-6 5.419-3.87A1 1 0 0 1 18 5.942v12.114a1 1 0 0 1-1.581.814L11 15m7 0a3 3 0 0 0 0-6M6 15h3v5H6v-5Z"
          />
        </Match>
      </Switch>
    </svg>
  );
};

export default CloseIcon;
