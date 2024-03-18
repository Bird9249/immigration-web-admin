import { JSX, ParentProps } from "solid-js";

interface AngleIconProps
  extends ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>> {
  iconDirection: "down" | "left" | "right" | "up";
}

export default function (props: AngleIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d={
          props.iconDirection === "down"
            ? "m19 9-7 7-7-7"
            : props.iconDirection === "up"
            ? "m5 15 7-7 7 7"
            : props.iconDirection === "left"
            ? "m15 19-7-7 7-7"
            : props.iconDirection === "right"
            ? "m9 5 7 7-7 7"
            : ""
        }
      />
    </svg>
  );
}
