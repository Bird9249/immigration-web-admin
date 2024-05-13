import { useNavigate, useParams } from "@solidjs/router";
import { format } from "date-fns";
import { Show, createResource, createSignal } from "solid-js";
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
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import deletePopupApi from "./api/delete-popup.api";
import getPopupDetailApi from "./api/get-popup-detail.api";

export default () => {
  const param = useParams();
  const navigator = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const [id] = createSignal<string>(param.id);
  const auth = useAuth();

  if (!checkPermission(Permission.Read, PermissionGroup.Banner, auth))
    navigator(-1);

  const [popups] = createResource(id, getPopupDetailApi);

  return (
    <div class="relative">
      <div class="mb-4 grid gap-4 sm:mb-5 sm:grid-cols-1 sm:gap-6 md:gap-12">
        <dl>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ຮູບພາບ
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show when={popups()} fallback={"..."}>
              <img
                src={import.meta.env.VITE_IMG_URL + popups()?.data.image}
                alt="no mage"
                class="w-full h-72 object-contain"
              />
            </Show>
          </dd>
        </dl>
      </div>
      <div>
        <dl>
          <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ເວລາເລີມຕົ້ນ:
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={popups()} fallback={"..."}>
                {(popup_start_time) =>
                  format(popup_start_time().data.start_time, "dd/MM/yyyy")
                }
              </Show>
            </dd>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ເວລາສິນສຸດ:
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={popups()} fallback={"..."}>
                {(popup_end_time) =>
                  format(popup_end_time().data.end_time, "dd/MM/yyyy")
                }
              </Show>
            </dd>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ລິ້ງ:
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={popups()} fallback={"..."}>
                {(popup_link) => (
                  <a
                    href={popup_link().data.link}
                    class="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                  >
                    {popup_link().data.link}
                  </a>
                )}
              </Show>
            </dd>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ເວລາສ້າງ:
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={popups()} fallback={"..."}>
                {(popup_created_at) =>
                  format(
                    popup_created_at().data.created_at,
                    "dd/MM/yyyy HH:mm:ss"
                  )
                }
              </Show>
            </dd>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ເວລາອັບເດດ:
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={popups()} fallback={"..."}>
                {(popup_updated_at) =>
                  format(
                    popup_updated_at().data.updated_at,
                    "dd/MM/yyyy HH:mm:ss"
                  )
                }
              </Show>
            </dd>
          </div>
        </dl>
      </div>
      <div class="p-4 flex items-center">
        <Show
          when={checkPermission(Permission.Write, PermissionGroup.Banner, auth)}
        >
          <Button
            class="mr-3"
            color="primary"
            prefixIcon={<EditIcon />}
            onClick={() => {
              navigator(`/banner/popup/edit/${param.id}`);
            }}
          >
            ແກ້ໄຂ
          </Button>
        </Show>

        <Show
          when={checkPermission(
            Permission.Remove,
            PermissionGroup.Banner,
            auth
          )}
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
                  const res = await deletePopupApi(param.id);

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
        <Show when={popups.loading}>
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
