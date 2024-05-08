import { format } from "date-fns";
import { JSX, JSXElement, Show, splitProps } from "solid-js";

interface TextInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  value?: string | undefined;
  prefixIcon?: JSXElement;
  subfixIcon?: JSXElement;
  inputClass?: string;
}

export default (props: TextInputProps) => {
  const [, inputProps] = splitProps(props, ["value", "label", "error"]);

  return (
    <div class={`w-full ${props.class}`}>
      <Show fallback={<></>} when={props.label}>
        <label
          for={props.name}
          class={`block mb-2 text-sm font-medium  ${
            props.error ? "text-red-500" : "text-gray-900"
          } dark:text-white`}
        >
          {props.label} {props.required && <span class="text-red-600">*</span>}
        </label>
      </Show>

      <div class="relative w-full">
        <Show when={props.prefixIcon}>
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span>{props.prefixIcon}</span>
          </div>
        </Show>

        <input
          {...inputProps}
          type="datetime-local"
          required={false}
          value={props.value ? format(props.value, "yyyy-MM-dd HH:mm") : ""}
          id={props.name}
          aria-invalid={!!props.error}
          aria-errormessage={`${props.name}-error`}
          class={`text-sm rounded-lg block w-full p-2.5 ${
            props.error
              ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          } transition ${
            props.prefixIcon ? "pl-10" : props.subfixIcon ? "pr-10" : ""
          } ${props.inputClass}`}
        />

        <Show when={props.subfixIcon}>
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span>{props.subfixIcon}</span>
          </div>
        </Show>
      </div>

      <Show when={props.error}>
        <p class="mt-2 text-sm text-red-500">{props.error}</p>
      </Show>
    </div>
  );
};
