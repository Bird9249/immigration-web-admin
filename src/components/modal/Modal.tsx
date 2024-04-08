import { Dialog, DialogRootProps } from "@ark-ui/solid";
import { JSX, ParentProps, Show } from "solid-js";
import { Portal } from "solid-js/web";
import CloseIcon from "../icons/CloseIcon";

interface DialogProps extends ParentProps<DialogRootProps> {
  header?: string;
  footer?: JSX.Element;
  close?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  modalClass?: string;
  backdropClass?: string;
}

export default (props: DialogProps) => {
  return (
    <Dialog.Root {...props} lazyMount unmountOnExit>
      <Portal mount={document.getElementById("root") as HTMLElement}>
        <Dialog.Backdrop class={`modal-backdrop ${props.backdropClass}`} />
        <Dialog.Positioner class={`modal ${props.modalClass}`}>
          <div class={`modal-container modal-${props.size || "md"}`}>
            <Dialog.Content class="modal-content">
              <Show when={props.header}>
                <div class="modal-header">
                  <h3 class="modal-header-title">{props.header}</h3>
                  <Dialog.CloseTrigger class="modal-header-close-icon">
                    <CloseIcon class="w-6 h-6" aria-hidden="true" />
                    <span class="sr-only">Close modal</span>
                  </Dialog.CloseTrigger>
                </div>
              </Show>

              <Show when={props.close}>
                <Dialog.CloseTrigger class="modal-close-icon">
                  <CloseIcon class="w-6 h-6" aria-hidden="true" />
                  <span class="sr-only">Close modal</span>
                </Dialog.CloseTrigger>
              </Show>

              {props.children}

              <Show when={props.footer}>
                <div class="modal-footer">{props.footer}</div>
              </Show>
            </Dialog.Content>
          </div>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
