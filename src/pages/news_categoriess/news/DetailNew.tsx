import { useNavigate, useParams } from "@solidjs/router";
import { format } from "date-fns";
import { Match, Show, Switch, createResource, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import EditIcon from "../../../components/icons/EditIcon";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Tabs from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import deleteNewsApi from "./api/delete-news.api";
import getNewsDetailApi from "./api/get-news-detail.api";
import NewsEditorContent from "./components/NewsEditorContent";

export default () => {
  const param = useParams();
  const navigator = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  if (!checkPermission(Permission.Read, PermissionGroup.News, auth))
    navigator(-1);

  const [id] = createSignal<string>(param.id);

  const [news] = createResource(id, getNewsDetailApi);

  return (
    <div class="relative">
      <Show when={news()} fallback={<div class="h-[470px]"></div>}>
        {(item) => (
          <>
            <Tabs
              items={item().data.translates.map((val) => ({
                key: val.lang,
                label:
                  val.lang === "lo"
                    ? "ພາສາລາວ"
                    : val.lang === "en"
                    ? "ພາສາອັງກິດ"
                    : "ພາສາຈີນ",
              }))}
              contents={item().data.translates.map((val) => ({
                key: val.lang,
                content: (
                  <div class="my-4">
                    <div class="px-4 mb-4 grid gap-4 sm:grid-cols-2 sm:gap-6 md:gap-12">
                      <dl>
                        <div class="relative w-full mx-auto">
                          <img
                            class="w-full object-cover rounded-md"
                            src={
                              import.meta.env.VITE_IMG_URL +
                              item().data.thumbnail
                            }
                            alt="Random image"
                          />
                        </div>
                      </dl>
                      <dl>
                        <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                          ຫົວຂໍ້
                        </dt>
                        <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                          <p>{val.title}</p>
                        </dd>
                        <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                          ຄຳອະທິບາຍ
                        </dt>
                        <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                          <p>{val.description}</p>
                        </dd>
                      </dl>
                    </div>

                    <dl>
                      <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ເນື້ອຫາ
                      </dt>
                      <dd class="px-4 py-2 bg-white rounded">
                        <NewsEditorContent content={val.content} />
                      </dd>
                    </dl>
                  </div>
                ),
              }))}
            />

            <div class="px-4 mb-4 grid gap-4 sm:mb-5 sm:grid-cols-2 sm:gap-6 md:gap-12">
              <dl>
                <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                  ປະເພດຂ່າວ:
                </dt>
                <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                  <Show
                    when={news()?.data.category}
                    fallback={"ບໍ່ໄດ້ລະບຸປະເພດ"}
                  >
                    {(category) => category().translates[0].name}
                  </Show>
                </dd>
                <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                  ສະຖານະ:
                </dt>
                <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                  <Show when={news()?.data.status} fallback={"..."}>
                    {(status) => (
                      <Switch>
                        <Match when={status() === "draft"}>
                          <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            ແບບຮ່າງ
                          </span>
                        </Match>
                        <Match when={status() === "private"}>
                          <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                            ສ່ວນໂຕ
                          </span>
                        </Match>
                        <Match when={status() === "published"}>
                          <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            ເຜີຍແຜ່
                          </span>
                        </Match>
                      </Switch>
                    )}
                  </Show>
                </dd>
              </dl>

              <dl>
                <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                  ເຜີຍແຜ່ເມື່ອ:
                </dt>
                <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                  <Show
                    when={news()?.data.public_at}
                    fallback={"ຍັງບໍ່ມີການເຜີຍແຜ່"}
                  >
                    {(public_at) => format(public_at(), "dd/MM/yyyy HH:mm:ss")}
                  </Show>
                </dd>
                <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                  ເພີ່ມເມື່ອ:
                </dt>
                <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                  <Show
                    when={news()?.data.created_at}
                    fallback={"ບໍ່ມີຂໍ້ມູນການເພີ່ມ"}
                  >
                    {(created_at) =>
                      format(created_at(), "dd/MM/yyyy HH:mm:ss")
                    }
                  </Show>
                </dd>
                <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                  ອັບເດດລ່າສຸດເມືອ:
                </dt>
                <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                  <Show
                    when={news()?.data.updated_at}
                    fallback={"ບໍ່ມີຂໍ້ມູນເວລາອັບເດດລ່າສຸດ"}
                  >
                    {(updated_at) =>
                      format(updated_at(), "dd/MM/yyyy HH:mm:ss")
                    }
                  </Show>
                </dd>
              </dl>
            </div>
          </>
        )}
      </Show>
      <br />

      <div class="p-4 flex items-center">
        <Show
          when={checkPermission(Permission.Write, PermissionGroup.News, auth)}
        >
          <Button
            class="mr-3"
            color="primary"
            prefixIcon={<EditIcon />}
            onClick={() => {
              navigator(`/newsCategoriess/news/edit/${param.id}`);
            }}
          >
            ແກ້ໄຂ
          </Button>
        </Show>

        <Show
          when={checkPermission(Permission.Remove, PermissionGroup.News, auth)}
        >
          <Button
            color="danger"
            prefixIcon={<TrashIcon />}
            onClick={() => {
              actionConfirm.showConfirm({
                icon: () => (
                  <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                ),
                message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                onConfirm: async () => {
                  const res = await deleteNewsApi(param.id);

                  actionMessage.showMessage({
                    level: "success",
                    message: res.data.message,
                  });
                },
              });
            }}
          >
            ລຶບ
          </Button>
        </Show>
      </div>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={news.loading}>
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
  );
};
