import { Dialog } from "@ark-ui/solid";
import CheckIcon from "../../components/icons/CheckIcon";
import CloseIcon from "../../components/icons/CloseIcon";
import ExclamationIcon from "../../components/icons/ExclamationIcon";
import InfoCircleIcon from "../../components/icons/InfoCircleIcon";

const Success = () => (
  <Dialog.Title class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
    <CheckIcon
      aria-hidden="true"
      class="w-8 h-8 text-green-500 dark:text-green-400"
    />
    <span class="sr-only">Success</span>
  </Dialog.Title>
);
const Danger = () => (
  <Dialog.Title class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 p-2 flex items-center justify-center mx-auto mb-3.5">
    <CloseIcon
      aria-hidden="true"
      class="w-8 h-8 text-red-500 dark:text-red-400"
    />
    <span class="sr-only">Error</span>
  </Dialog.Title>
);
const Info = () => (
  <Dialog.Title class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 p-2 flex items-center justify-center mx-auto mb-3.5">
    <InfoCircleIcon
      iconDirection="line"
      aria-hidden="true"
      class="text-blue-500 dark:text-blue-400"
    />
    <span class="sr-only">Information</span>
  </Dialog.Title>
);
const Warn = () => (
  <Dialog.Title class="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 p-2 flex items-center justify-center mx-auto mb-3.5">
    <ExclamationIcon
      iconDirection="line"
      aria-hidden="true"
      class="text-yellow-500 dark:text-yellow-400"
    />
    <span class="sr-only">Warning</span>
  </Dialog.Title>
);

export { Danger, Info, Success, Warn };
