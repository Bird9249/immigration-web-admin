import {
  createEffect,
  createResource,
  createSignal,
  For,
  Match,
  ParentProps,
  Show,
  Signal,
  Switch,
} from "solid-js";
import { Transition } from "solid-transition-group";
import { Stack } from "stack-typed";
import convertToByteUnit from "../../common/utils/convert-to-byte-unit";
import Alert from "../../components/alert/Alert";
import AngleIcon from "../../components/icons/AngleIcon";
import CloseIcon from "../../components/icons/CloseIcon";
import FolderIcon from "../../components/icons/FolderIcon";
import LoadingIcon from "../../components/icons/LoadingIcon";
import PenIcon from "../../components/icons/PenIcon";
import TrashIcon from "../../components/icons/TrashIcon";
import Modal from "../../components/modal/Modal";
import { useAxios } from "../../contexts/axios/AxiosContext";
import { useConfirm } from "../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../utils/transition-animation";
import getFileAndFolderApi from "./api/get-file-and-folder.api";
import removeFileApi from "./api/remove-file.api";
import removeFolderApi from "./api/remove-folder.api";
import FileOrFolderForm from "./FileOrFolderForm";
import RenameFolder from "./RenameFolder";

type Props = {
  open: Signal<boolean>;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string) => void;
};

export const FileAndFolder = (props: ParentProps<Props>) => {
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const {
    error: [error, setError],
  } = useAxios();

  let lastClickTime = 0;

  const [renameFolderOpen, setRenameFolderOpen] = createSignal<boolean>(false);

  const stack = new Stack<{ id: number; name: string }>([
    { id: 0, name: "editor" },
  ]);
  const [breadcrumbStack, setBreadcrumbStack] =
    createSignal<Stack<{ id: number; name: string }>>(stack);

  const [state, setState] = createSignal<{
    parent_id: string;
    name: string;
    id: number;
  }>({
    parent_id: "0",
    name: "",
    id: 0,
  });

  const [fileAndFolder, { refetch }] = createResource(
    state,
    getFileAndFolderApi
  );

  createEffect(async () => {
    if (props.open[0]()) {
      await refetch();
    }
  });

  return (
    <>
      <Modal
        onOpenChange={({ open }) => {
          props.onOpenChange(open);
        }}
        open={props.open[0]()}
        size="xl"
      >
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            ໄຟລ໌ ແລະ ໂຟນເດີຂອງຕົວແກ້ໄຂຂໍ້ຄວາມ
          </h3>
          <button
            onClick={() => {
              props.open[1]((prev) => !prev);
            }}
            type="button"
            class="transition text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <CloseIcon class="size-5" />
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <div class="p-4 relative">
          <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse mb-4 flex-wrap">
            <For each={breadcrumbStack().elements}>
              {(item, idx) => (
                <li
                  aria-current={
                    idx() === breadcrumbStack().elements.length - 1
                      ? "page"
                      : undefined
                  }
                >
                  <div class="flex items-center">
                    <Show when={idx() !== 0}>
                      <AngleIcon
                        iconDirection="right"
                        class="block size-4 mx-1 text-gray-400"
                      />
                    </Show>

                    <Show
                      when={idx() !== breadcrumbStack().elements.length - 1}
                      fallback={
                        <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                          {item.name}
                        </span>
                      }
                    >
                      <a
                        onClick={() => {
                          setBreadcrumbStack((prev) => {
                            while (prev.peek()?.id !== item.id) prev.pop();
                            return prev.clone();
                          });
                          setState((prev) => ({
                            ...prev,
                            parent_id: item.id.toString(),
                          }));
                        }}
                        href="#"
                        class="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                      >
                        {item.name}
                      </a>
                    </Show>
                  </div>
                </li>
              )}
            </For>
          </ol>

          <Show when={error()}>
            {(err) => (
              <Alert
                level={err().level}
                message={err().message}
                onClose={() => setError(undefined)}
              />
            )}
          </Show>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <For each={fileAndFolder()?.data}>
              {({ id, name, type, size }) => (
                <div
                  class="flex flex-col gap-2 text-nowrap border dark:border-gray-500 dark:hover:border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer dark:text-white"
                  onClick={() => {
                    const currentTime = new Date().getTime();

                    const timeDifference = currentTime - lastClickTime;

                    if (timeDifference < 300) {
                      if (type === "directory") {
                        setBreadcrumbStack((prev) => {
                          prev.push({ id, name });
                          return prev.clone();
                        });
                        setState((prev) => ({
                          ...prev,
                          parent_id: id.toString(),
                        }));
                      } else
                        props.onSelect(
                          import.meta.env.VITE_IMG_URL +
                            breadcrumbStack()
                              .elements.map((val) => val.name)
                              .join("/") +
                            "/" +
                            name
                        );

                      lastClickTime = 0;
                    } else {
                      lastClickTime = currentTime;
                    }
                  }}
                >
                  <Switch>
                    <Match when={type === "directory"}>
                      <div class="flex justify-center items-center size-full h-[160px] relative">
                        <FolderIcon
                          iconDirection="line"
                          class="size-24 text-primary-600 dark:text-primary-400"
                        />
                        <div class="absolute top-1 right-1 flex flex-col items-center">
                          <button
                            onClick={() => {
                              setState((prev) => ({ ...prev, name, id }));
                              setRenameFolderOpen(true);
                            }}
                            type="button"
                            class="transition text-primary-400 bg-transparent hover:bg-primary-200 hover:text-primary-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-primary-600 dark:hover:text-white"
                          >
                            <PenIcon class="size-5" />
                            <span class="sr-only">Rename</span>
                          </button>

                          <button
                            onClick={() =>
                              actionConfirm.showConfirm({
                                icon: () => (
                                  <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                                ),
                                message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                                onConfirm: async () => {
                                  const res = await removeFolderApi(String(id));

                                  if (res) {
                                    await refetch();
                                    setError(undefined);
                                  }
                                },
                              })
                            }
                            type="button"
                            class="transition text-red-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
                          >
                            <TrashIcon class="size-5" />
                            <span class="sr-only">Remove</span>
                          </button>
                        </div>
                      </div>
                    </Match>

                    <Match when={type === "file"}>
                      <div class="flex justify-center items-center size-full h-[160px] relative">
                        <img
                          class="h-[160px] max-w-full object-contain"
                          src={
                            import.meta.env.VITE_IMG_URL +
                            breadcrumbStack()
                              .elements.map((val) => val.name)
                              .join("/") +
                            "/" +
                            name
                          }
                          alt={name}
                        />
                        <div class="absolute top-1 right-1 flex flex-col items-center">
                          <button
                            onClick={async () => {
                              actionConfirm.showConfirm({
                                icon: () => (
                                  <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                                ),
                                message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                                onConfirm: async () => {
                                  const res = await removeFileApi(String(id));

                                  if (res) {
                                    await refetch();
                                    setError(undefined);
                                  }
                                },
                              });
                            }}
                            type="button"
                            class="transition text-red-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
                          >
                            <TrashIcon class="size-5" />
                            <span class="sr-only">Rename</span>
                          </button>
                        </div>
                      </div>
                    </Match>
                  </Switch>

                  <div class="leading-4 px-2 pb-2">
                    <p class="text-ellipsis text-sm overflow-hidden">{name}</p>

                    <span class="text-xs text-gray-500 dark:text-gray-300">
                      ຂະໜາດ: {convertToByteUnit(size)}
                    </span>
                  </div>
                </div>
              )}
            </For>

            <FileOrFolderForm
              folderId={state}
              onSuccess={async () => {
                await refetch();
              }}
            />
          </div>

          <Transition onEnter={fadeIn} onExit={fadeOut}>
            <Show when={fileAndFolder.loading}>
              <div
                class={`absolute z-10 top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center`}
              >
                <div>
                  <LoadingIcon class="animate-spin w-8 h-8" />
                </div>
              </div>
            </Show>
          </Transition>
        </div>
      </Modal>
      <RenameFolder
        folderId={state}
        open={[renameFolderOpen, setRenameFolderOpen]}
        onSuccess={async () => await refetch()}
      />
    </>
  );
};
