import { JSX, ParentProps, Show } from "solid-js";
interface IconProps extends ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>> {
  iconDirection?: "vertical";
}

export default (props: IconProps) => {
  return (
    <>
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <Show
          when={props.iconDirection === "vertical"}
          fallback={
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M6 12h0m6 0h0m6 0h0"
            />
          }
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="M12 6h0m0 6h0m0 6h0"
          />
        </Show>
      </svg>
    </>
  );
};
