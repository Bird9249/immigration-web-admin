import { FormStore, setValue } from "@modular-forms/solid";
import { createEffect, createSignal, on } from "solid-js";

type ToggleProps = {
  name: string;
  label?: string;
  value: boolean | undefined;
  error: string;
  form: FormStore<any, any>;
  onValueChange?: (value: boolean) => void;
};

export default (props: ToggleProps) => {
  const [state, setState] = createSignal<boolean>(
    props.value ? props.value : false
  );

  createEffect(
    on(state, (input: boolean) => {
      setValue(props.form, props.name, input);
    })
  );

  return (
    <label class="inline-flex items-center cursor-pointer">
      <input
        checked={state()}
        type="checkbox"
        class="sr-only peer"
        onInput={() => {
          setState((prev) => !prev);

          if (props.onValueChange) {
            props.onValueChange(state());
          }
        }}
      />
      <div class="transition relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
      <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {props.label}
      </span>
    </label>
  );
};
