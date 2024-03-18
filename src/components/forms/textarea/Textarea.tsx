import { JSX, Show, splitProps } from "solid-js";

interface TextInputProps
  extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  value?: string | undefined;
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

      <textarea
        {...inputProps}
        rows={props.rows ? props.rows : 4}
        class="block p-2.5 w-full text-sm rounded-lg border transition"
        classList={{
          "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500":
            Boolean(props.error),
          "bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500":
            !props.error,
        }}
        required={false}
        id={props.name}
        value={props.value || ""}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
      ></textarea>

      <Show when={props.error}>
        <p class="mt-2 text-sm text-red-500">{props.error}</p>
      </Show>
    </div>
  );
};
