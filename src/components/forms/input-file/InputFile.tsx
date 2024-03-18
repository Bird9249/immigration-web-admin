import { JSX, JSXElement, ParentProps, Show } from "solid-js";

interface Props extends ParentProps<JSX.InputHTMLAttributes<HTMLInputElement>> {
  label?: string;
  error?: string;
  value?: string | undefined;
  helpMessage?: string;
  previewImage?: JSXElement;
  onSelectFile?: (files: FileList) => void;
}

export default (props: Props) => {
  return (
    <>
      <div class="sm:col-span-2">
        <Show when={props.label}>
          <label
            for={props.name}
            class={`block mb-2 text-sm font-medium  ${
              props.error ? "text-red-500" : "text-gray-900"
            } dark:text-white`}
          >
            {props.label}{" "}
            {props.required && <span class="text-red-600">*</span>}
          </label>
        </Show>

        <div class="sm:flex items-center w-full">
          <div>
            <Show when={props.previewImage}>{props.previewImage}</Show>
          </div>
          <div class="w-full">
            <input
              {...props}
              onInput={(e) => {
                if (props.onSelectFile && e.target.files)
                  props.onSelectFile(e.target.files);
              }}
              required={false}
              class="text-sm border rounded-lg cursor-pointer focus:outline-none w-full"
              classList={{
                "text-gray-900 border-gray-300 bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400":
                  !props.error,
                "text-red-900 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-700 dark:border-red-600 dark:placeholder-red-400":
                  Boolean(props.error),
              }}
              aria-describedby={props.name}
              type="file"
              id={props.name}
              aria-invalid={!!props.error}
              aria-errormessage={`${props.name}-error`}
            />
            <p
              class="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id={props.name}
            >
              {props.helpMessage}
            </p>
          </div>
        </div>
        <Show when={props.error}>
          <p class="mt-2 text-sm text-red-500">{props.error}</p>
        </Show>
      </div>
    </>
  );
};
