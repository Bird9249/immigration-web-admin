import {
  ParentComponent,
  ParentProps,
  createContext,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { Dynamic } from "solid-js/web";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import { Danger, Info, Success, Warn } from "./MessageIcon";

type MessageContextState = {
  message?: string;
  level?: "info" | "danger" | "success" | "warning";
  isShowMessage: boolean;
};

type MessageContextValue = [
  state: MessageContextState,
  actions: {
    showMessage: (state: Omit<MessageContextState, "isShowMessage">) => void;
  }
];

const iconOptions = {
  info: Info,
  danger: Danger,
  success: Success,
  warning: Warn,
};

const MessageContext = createContext<MessageContextValue>([
  { isShowMessage: false },
  { showMessage: () => undefined },
]);

export const MessageProvider: ParentComponent = (props: ParentProps) => {
  const [state, setState] = createStore<MessageContextState>({
    isShowMessage: false,
  });

  const showMessage = ({
    level,
    message,
  }: Omit<MessageContextState, "isShowMessage">) => {
    setState("isShowMessage", true);
    setState("level", level);
    setState("message", message);
  };

  return (
    <MessageContext.Provider value={[state, { showMessage }]}>
      {props.children}
      <Modal
        open={state.isShowMessage}
        onOpenChange={({ open }) => setState("isShowMessage", open)}
        close
        modalClass="!z-50"
        backdropClass="!z-50"
      >
        <div class=" p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {state.level ? (
            <Dynamic component={iconOptions[state.level]} />
          ) : undefined}

          <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {state.message}
          </p>

          <Button
            onClick={() => {
              setState("isShowMessage", false);
            }}
          >
            ສືບຕໍ່
          </Button>
        </div>
      </Modal>
    </MessageContext.Provider>
  );
};

export function useMessage() {
  return useContext(MessageContext);
}
