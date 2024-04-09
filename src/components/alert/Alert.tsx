import { ParentProps } from "solid-js";
import CloseIcon from "../icons/CloseIcon";
import InfoCircleIcon from "../icons/InfoCircleIcon";

type Props = {
  message: string;
  level: "warn" | "danger";
  onClose: () => void;
};

export default (props: ParentProps<Props>) => {
  return (
    <div
      class="flex items-center p-4 mb-4 text-sm  rounded-lg dark:bg-gray-800 "
      classList={{
        "text-red-800 bg-red-50 dark:text-red-400": props.level === "danger",
        "text-yellow-800 bg-yellow-50 dark:text-yellow-400":
          props.level === "warn",
      }}
      role="alert"
    >
      <InfoCircleIcon class="flex-shrink-0 inline size-5 me-3" />
      <span class="sr-only">Info</span>
      <div>{props.message}</div>
      <button
        onClick={() => {
          props.onClose();
        }}
        type="button"
        class="transition ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:hover:bg-gray-700"
        classList={{
          "bg-red-50 text-red-500  focus:ring-red-400  hover:bg-red-200 dark:text-red-400":
            props.level === "danger",
          "bg-yellow-50 text-yellow-500  focus:ring-yellow-400  hover:bg-yellow-200 dark:text-yellow-400":
            props.level === "warn",
        }}
        aria-label="Close"
      >
        <span class="sr-only">Close</span>
        <CloseIcon class="size-4" />
      </button>
    </div>
  );
};
