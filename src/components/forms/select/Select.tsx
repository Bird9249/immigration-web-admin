import { Select, SelectRootProps } from "@ark-ui/solid";
import { Index, Portal, Show } from "solid-js/web";
import AngleIcon from "../../icons/AngleIcon";
import "./Select.scss";

interface Props
  extends SelectRootProps<{ label: string; value: string | undefined }> {
  placeholder?: string;
  label?: string;
  size?: "xs" | "sm" | "md" | "lg";
  contentClass?: string;
  error?: string;
  required?: boolean;
}

export default (props: Props) => {
  return (
    <Select.Root {...props} lazyMount unmountOnExit>
      <Show when={props.label}>
        <Select.Label
          for={props.name}
          class={`block mb-2 text-sm font-medium  ${
            props.error ? "text-red-500" : "text-gray-900"
          } dark:text-white`}
        >
          {props.label} {props.required && <span class="text-red-600">*</span>}
        </Select.Label>
      </Show>

      <Select.Control
        class="border rounded-lg block transition"
        classList={{
          "p-2 text-xs": props.size === "xs",
          "p-2 text-sm": props.size === "sm",
          "p-2.5 text-sm": props.size === "md" || !props.size,
          "p-2.5 px-4 py-3": props.size === "lg",
          "text-gray-900 bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white":
            !props.error,
          "text-red-700 bg-red-50 border-red-500 dark:bg-gray-700 dark:border-red-600 dark:placeholder-red-400 dark:text-red-400":
            Boolean(props.error),
        }}
      >
        <Select.Trigger class="flex justify-between items-center w-full">
          <Select.ValueText placeholder={props.placeholder ?? "Select"} />
          <Select.Indicator class="ms-2">
            <AngleIcon iconDirection="down" class="w-4 h-4" />
          </Select.Indicator>
        </Select.Trigger>
      </Select.Control>

      <Show when={props.error}>
        <p class="mt-2 text-sm text-red-500">{props.error}</p>
      </Show>

      <Portal>
        <Select.Positioner>
          <Select.Content
            class={`z-20 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 max-h-[300px] overflow-auto ${props.contentClass}`}
          >
            <div class="py-2 text-sm text-gray-700 dark:text-gray-200">
              <Index each={props.items}>
                {(item) => (
                  <a href="#">
                    <Select.Item
                      item={item()}
                      class="flex px-4 py-2 justify-between dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition relative"
                    >
                      <Select.ItemText class="z-20">
                        {item().label}
                      </Select.ItemText>
                      <Select.ItemIndicator class="absolute top-0 left-0 w-full h-full bg-primary-50 hover:bg-primary-100 dark:opacity-10"></Select.ItemIndicator>
                    </Select.Item>
                  </a>
                )}
              </Index>
            </div>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
