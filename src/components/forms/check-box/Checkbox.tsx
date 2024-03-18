import { JSX, JSXElement, Show, splitProps } from "solid-js";

interface CheckboxProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label: string | JSXElement;
  checked: boolean | undefined;
  error?: string;
}

export default (props: CheckboxProps) => {
  const [, inputProps] = splitProps(props, ["label"]);

  return (
    <>
      <div class="flex m-4">
        <div class="flex items-center h-5">
          <input
            {...inputProps}
            id={String(props.value)}
            aria-describedby={props.name}
            aria-errormessage={`${props.name}-error`}
            type="checkbox"
            class="w-4 h-4 focus:ring-2 transition rounded"
            classList={{
              "text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-600 dark:border-gray-500":
                !props.error,
              "text-red-900 bg-red-50 border-red-500 focus:ring-red-500 dark:text-red-500 dark:bg-gray-600 dark:border-red-500":
                Boolean(props.error),
            }}
          />
        </div>

        <div class="ms-2 text-sm">
          <label
            for={String(props.value)}
            class="font-medium"
            classList={{
              "text-gray-400 dark:text-gray-500": props.disabled,
              "text-gray-900 dark:text-gray-300": !props.disabled,
              "text-red-900 dark:text-red-500":
                Boolean(props.error) && !props.disabled,
              "text-red-400 dark:text-red-500":
                Boolean(props.error) && props.disabled,
            }}
          >
            {props.label}
          </label>

          <Show when={props.error}>
            <p class="text-xs font-normal text-red-400 dark:text-red-500">
              {props.error}
            </p>
          </Show>
        </div>
      </div>
    </>
  );
};
