import { JSX, JSXElement, Show } from "solid-js";
import LoadingIcon from "../icons/LoadingIcon";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  color?: "primary" | "secondary" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  prefixIcon?: JSXElement;
  subfixIcon?: JSXElement;
  outlined?: boolean;
}

export default (props: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={props.disabled || props.isLoading}
      type={props.type}
      class={`button button-${props.color || "primary"}${
        props.outlined ? "-outline" : ""
      } button-${props.size || "md"} ${props.class} `}
    >
      <Show when={props.prefixIcon && !props.isLoading}>
        <span class="me-1">{props.prefixIcon}</span>
      </Show>

      <Show when={props.isLoading} fallback={props.children}>
        <>
          <LoadingIcon class="button-loading" />
          ກຳລັງໂຫລດ...
        </>
      </Show>

      <Show when={props.subfixIcon && !props.isLoading}>
        <span class="ms-1">{props.subfixIcon}</span>
      </Show>
    </button>
  );
};
