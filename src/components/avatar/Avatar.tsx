import { ParentProps, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import profilePlaceholder from "../../assets/profile-placeholder.webp";
import { fadeIn, fadeOut } from "../../utils/transition-animation";
import LoadingIcon from "../icons/LoadingIcon";

type AvatarProps = ParentProps<{
  size: "xs" | "sm" | "md" | "lg" | "xl";
  src?: string;
  alt: string;
  isLoading?: boolean;
  class?: string;
  text?: string;
}>;

export default (props: AvatarProps) => {
  return (
    <div class="flex items-center gap-2">
      <div
        class={`relative overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${props.class}`}
        classList={{
          "w-6 h-6": props.size === "xs",
          "w-8 h-8": props.size === "sm",
          "w-10 h-10": props.size === "md",
          "w-20 h-20": props.size === "lg",
          "w-36 h-36": props.size === "xl",
        }}
      >
        <img
          class="rounded-full object-cover"
          classList={{
            "w-6 h-6": props.size === "xs",
            "w-8 h-8": props.size === "sm",
            "w-10 h-10": props.size === "md",
            "w-20 h-20": props.size === "lg",
            "w-36 h-36": props.size === "xl",
          }}
          src={props.src && !props.isLoading ? props.src : profilePlaceholder}
          alt={props.alt}
        />

        <Transition onEnter={fadeIn} onExit={fadeOut}>
          <Show when={props.isLoading}>
            <div
              class={`absolute z-20 top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center`}
            >
              <div>
                <LoadingIcon
                  class="animate-spin"
                  classList={{
                    "w-2 h-2": props.size === "xs",
                    "w-4 h-4": props.size === "sm",
                    "w-5 h-5": props.size === "md",
                    "w-9 h-9": props.size === "lg",
                    "w-16 h-16": props.size === "xl",
                  }}
                />
              </div>
            </div>
          </Show>
        </Transition>
      </div>

      <Show when={props.text}>
        <div class="text-sm text-gray-500 dark:text-gray-400">{props.text}</div>
      </Show>
    </div>
  );
};
