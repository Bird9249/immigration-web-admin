import { JSX, Show, createSignal, splitProps } from "solid-js";
import EyeIcon from "../../icons/EyeIcon";

interface PasswordInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  value?: string | undefined;
}

export default (props: PasswordInputProps) => {
  const [isShowPassword, setIsShowPassword] = createSignal<boolean>(false);

  const [, inputProps] = splitProps(props, ["value", "label", "error"]);

  return (
    <div>
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

      <div class="relative ">
        <input
          {...inputProps}
          required={false}
          id={props.name}
          value={props.value || ""}
          aria-invalid={!!props.error}
          aria-errormessage={`${props.name}-error`}
          type={isShowPassword() ? "text" : "password"}
          class={`sm:text-sm rounded-lg block w-full p-2.5 ${
            props.error
              ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          } transition`}
        />
        <div
          class="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer"
          onClick={() => {
            setIsShowPassword((prev) => !prev);
          }}
        >
          <EyeIcon
            iconDirection={isShowPassword() ? "slash" : undefined}
            class={`"w-4 h-4 ${
              props.error ? "text-red-900" : "text-gray-500 dark:text-gray-400"
            } "`}
          />
        </div>
      </div>

      <Show fallback={<></>} when={props.error}>
        <p class="mt-2 text-sm text-red-500">{props.error}</p>
      </Show>
    </div>
  );
};
