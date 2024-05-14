import { JSX, ParentProps, Show, Signal } from "solid-js";

interface Props extends ParentProps<JSX.InputHTMLAttributes<HTMLInputElement>> {
  error?: string;
  value?: string | undefined;
  helpMessage?: string;
  onSelectFile?: (file?: File) => void;
  imageAccept?: string;
  previewImage: Signal<string>;
  id?: string;
}

export default (props: Props) => {
  return (
    <div class="flex flex-col items-center justify-center w-full">
      <label
        for={props.id ? props.id : "dropzone-file"}
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer"
        classList={{
          "border-gray-300 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600":
            !props.error,
          "border-red-300 bg-red-50 dark:hover:bg-bray-800 dark:bg-red-700 hover:bg-red-100 dark:border-red-600 dark:hover:border-red-500 dark:hover:bg-red-600":
            Boolean(props.error),
        }}
      >
        <Show
          when={props.previewImage[0]()}
          fallback={
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">ຄລິກເພື່ອອັບໂຫລດ</span>{" "}
                ຫຼືລາກແລ້ວວາງລົງ
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {props.helpMessage}
              </p>
            </div>
          }
        >
          <img
            src={props.previewImage[0]()}
            alt="preview image"
            class="w-full h-full object-contain"
          />
        </Show>

        <input
          accept={props.imageAccept}
          id={props.id ? props.id : "dropzone-file"}
          type="file"
          class="hidden"
          onInput={(e) => {
            if (e.target.files) {
              if (e.target.files.length > 0) {
                props.previewImage[1](URL.createObjectURL(e.target.files[0]));
                if (props.onSelectFile) props.onSelectFile(e.target.files[0]);
              } else {
                props.previewImage[1]("");
                if (props.onSelectFile) props.onSelectFile(undefined);
              }
            }
          }}
        />
      </label>

      <Show when={props.error}>
        <p class="mt-2 text-sm text-red-500 w-full">{props.error}</p>
      </Show>
    </div>
  );
};
