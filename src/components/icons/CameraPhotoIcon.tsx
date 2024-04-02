import { JSX, Match, ParentProps, Switch } from "solid-js";

interface EyeIconProps
  extends ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>> {
  iconDirection?: "line";
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
        fill={`${props.iconDirection === "line" ? "none" : "currentColor"}`}
        viewBox="0 0 24 24"
      >
        <Switch
          fallback={
            <path
              fill-rule="evenodd"
              d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
              clip-rule="evenodd"
            />
          }
        >
          <Match when={props.iconDirection === "line"}>
            <path
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
            />
            <path
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </Match>
        </Switch>
      </svg>
    </>
  );
}
