import { Accordion } from "@ark-ui/solid";
import { useNavigate } from "@solidjs/router";
import { Editor } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { addMilliseconds, format } from "date-fns";
import { Index, Show, createEffect, createSignal, on, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { Transition } from "solid-transition-group";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import AngleIcon from "../../../components/icons/AngleIcon";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import PenIcon from "../../../components/icons/PenIcon";
import PlusIcon from "../../../components/icons/PlusIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Tabs from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import deleteLostPassportApi from "./apis/delete-lost-passport.api";
import getLostPassportDetailApi from "./apis/get-lost-passport-detail.api";
import getLostPassportApi from "./apis/get-lost-passport.api";
import {
  LostPassportDetailResponse,
  LostPassportTableState,
} from "./apis/lost-passport.interface";

export default () => {
  const navigate = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  if (!checkPermission(Permission.Read, PermissionGroup.LostPassport, auth))
    navigate(-1);

  const [accordionValue, setAccordionValue] = createSignal<string>("");
  const [responseLength, setResponseLength] = createSignal<number>(0);

  const [state, setState] = createSignal<LostPassportTableState>({
    data: [],
    total: 0,
    cursor: "",
    limit: 10,
    length: 0,
    lang: "lo",
  });
  const [loading, setLoading] = createSignal<boolean>(false);

  onMount(async () => {
    setLoading(true);

    const res = await getLostPassportApi(state());

    setState((prev) => ({
      ...prev,
      data: [...prev.data, ...res.data.data],
      total: res.data.total,
      length: res.data.data.length,
    }));

    setLoading(false);
  });

  const [ele, setEle] = createSignal<HTMLDivElement>();
  const [detail, setDetail] = createStore<{
    loading: boolean;
    detail?: LostPassportDetailResponse;
  }>({ loading: false });

  createEffect(
    on(ele, async (input) => {
      if (input) {
        setDetail("loading", true);

        const res = await getLostPassportDetailApi({
          id: accordionValue(),
          lang: state().lang,
        });

        setDetail({ loading: false, detail: res.data });

        new Editor({
          element: input,
          editable: false,
          content: res.data.content,
          extensions: [
            StarterKit.configure({
              paragraph: { HTMLAttributes: { class: "text-gray-500" } },
              italic: { HTMLAttributes: { class: "font-italic" } },
              bold: {
                HTMLAttributes: { class: "font-semibold text-gray-900" },
              },
              orderedList: {
                HTMLAttributes: {
                  class: "space-y-1 text-gray-500 list-decimal",
                },
              },
              bulletList: {
                HTMLAttributes: {
                  class: "space-y-1 text-gray-500 list-disc",
                },
              },
              blockquote: {
                HTMLAttributes: {
                  class: "text-xl italic font-semibold text-gray-900",
                },
              },
              horizontalRule: {
                HTMLAttributes: {
                  class: "h-px my-8 bg-gray-200 border-0",
                },
              },
            }),
            Underline.configure({ HTMLAttributes: { class: "underline" } }),
            TextAlign.configure({
              types: ["heading", "paragraph"],
            }),
            Link.configure({
              HTMLAttributes: {
                class: "font-medium text-primary-600 hover:underline",
              },
              openOnClick: "whenNotEditable",
            }),
            Image.configure({
              HTMLAttributes: {
                class: "h-auto max-w-full rounded-lg",
              },
            }),
          ],
        });
      }
    })
  );

  return (
    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="flex flex-col items-start justify-between dark:border-gray-600 p-4 sm:flex-row sm:items-center">
        <h2 class="text-lg font-semibold mb-2 sm:mb-0 dark:text-white">
          ໜັງສືຜ່ານແດນເສຍ ຫຼືຖືກລັກ
        </h2>

        <div class=" flex items-center justify-end flex-col sm:flex-row gap-2 w-full sm:w-fit">
          <Show
            when={checkPermission(
              Permission.Write,
              PermissionGroup.LostPassport,
              auth
            )}
          >
            <Button
              class="w-full sm:w-fit"
              prefixIcon={<PlusIcon class="size-4" />}
              onClick={() => {
                navigate("/lost-passport/create");
              }}
            >
              ເພີ່ມຂໍ້ມູນ
            </Button>
          </Show>
        </div>
      </div>

      <div class="relative">
        <Tabs
          items={[
            { label: "ພາສາລາວ", key: "lo" },
            { label: "ພາສາອັງກິດ", key: "en" },
            { label: "ພາສາຈີນ", key: "zh_cn" },
          ]}
          contents={[{ key: "lo" }, { key: "en" }, { key: "zh_cn" }].map(
            (val) => ({
              ...val,
              content: (
                <Accordion.Root
                  value={[accordionValue()]}
                  onValueChange={async ({ value }) => {
                    setAccordionValue(value[0]);
                    setEle(undefined);
                  }}
                  lazyMount
                  unmountOnExit
                  class="relative"
                  collapsible
                >
                  <Show when={state().data}>
                    {(res) => (
                      <Index each={state().data}>
                        {(item, idx) => (
                          <Accordion.Item value={String(item().id)}>
                            <Accordion.ItemTrigger
                              class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 dark:border-gray-700 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-gray-800 gap-3"
                              classList={{
                                "border-b-0": idx !== state().data.length - 1,
                              }}
                            >
                              <span>{item().title}</span>
                              <Accordion.ItemIndicator>
                                <AngleIcon
                                  iconDirection={
                                    accordionValue() === String(item().id)
                                      ? "up"
                                      : "down"
                                  }
                                  class="size-5 shrink-0"
                                />
                              </Accordion.ItemIndicator>
                            </Accordion.ItemTrigger>

                            <Accordion.ItemContent
                              class="border border-gray-200 dark:border-gray-700"
                              classList={{
                                "border-b-0": idx !== state().data.length - 1,
                              }}
                            >
                              <div class="bg-white p-5 relative">
                                <div class="absolute top-4 right-4 z-10 flex items-center">
                                  <Show
                                    when={checkPermission(
                                      Permission.Write,
                                      PermissionGroup.LostPassport,
                                      auth
                                    )}
                                  >
                                    <button
                                      onClick={() => {
                                        navigate(
                                          `/lost-passport/edit/${item().id}`
                                        );
                                      }}
                                      type="button"
                                      class="transition text-primary-600 bg-transparent hover:bg-primary-200 hover:text-primary-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-primary-600 dark:hover:text-white"
                                    >
                                      <PenIcon class="size-5" />
                                      <span class="sr-only">Edit</span>
                                    </button>
                                  </Show>

                                  <Show
                                    when={checkPermission(
                                      Permission.Remove,
                                      PermissionGroup.LostPassport,
                                      auth
                                    )}
                                  >
                                    <button
                                      onClick={() => {
                                        actionConfirm.showConfirm({
                                          icon: () => (
                                            <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                                          ),
                                          message:
                                            "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                                          onConfirm: async () => {
                                            const res =
                                              await deleteLostPassportApi(
                                                String(item().id)
                                              );
                                            actionMessage.showMessage({
                                              level: "success",
                                              message: res.data.message,
                                            });

                                            setState((prev) => ({
                                              ...prev,
                                              data: prev.data.filter(
                                                (val) => val.id !== item().id
                                              ),
                                            }));
                                          },
                                        });
                                      }}
                                      type="button"
                                      class="transition text-red-600 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
                                    >
                                      <TrashIcon class="size-5" />
                                      <span class="sr-only">Remove</span>
                                    </button>
                                  </Show>
                                </div>

                                <div
                                  classList={{
                                    "min-h-16": detail.loading,
                                  }}
                                  ref={(el) => {
                                    if (!ele()) setEle(el);
                                  }}
                                ></div>

                                <Transition onEnter={fadeIn} onExit={fadeOut}>
                                  <Show when={detail.loading}>
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
                            </Accordion.ItemContent>
                          </Accordion.Item>
                        )}
                      </Index>
                    )}
                  </Show>
                </Accordion.Root>
              ),
            })
          )}
          onValueChange={async (value) => {
            setLoading(true);
            setState((prev) => ({
              ...prev,
              cursor: "",
              data: [],
              lang: value as "lo" | "en" | "zh_cn",
              total: 0,
              length: 0,
            }));

            const res = await getLostPassportApi(state());
            setState((prev) => ({
              ...prev,
              data: res.data.data,
              total: res.data.total,
              length: res.data.data.length,
            }));

            setAccordionValue("");
            setEle(undefined);

            setLoading(false);
          }}
        />

        <Show when={state().length >= state().limit}>
          <div class="mt-4 flex justify-center px-4 pb-4">
            <Button
              color="primary"
              isLoading={loading()}
              onClick={async () => {
                setLoading(true);

                const lastIdx = state().data.length - 1;
                const cursor = addMilliseconds(
                  state().data[lastIdx].created_at,
                  1
                );
                setState((prev) => ({
                  ...prev,
                  cursor: format(cursor, "yyyy-MM-dd HH:mm:ss.SSS"),
                }));

                const res = await getLostPassportApi(state());
                setState((prev) => ({
                  ...prev,
                  length: res.data.data.length,
                  data: [...prev.data, ...res.data.data],
                }));

                setLoading(false);
              }}
            >
              ເພີ່ມເຕີມ
            </Button>
          </div>
        </Show>

        <Transition onEnter={fadeIn} onExit={fadeOut}>
          <Show when={loading() && state().data.length <= 0}>
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
    </div>
  );
};
