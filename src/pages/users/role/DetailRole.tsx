import { useNavigate, useParams } from "@solidjs/router";
import { format } from "date-fns";
import { For, Show, createResource, createSignal } from "solid-js";
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
import deleteRoleApi from "./api/delete-role.api";
import getRoleDetailApi from "./api/get-role-detail.api";

export default () => {
  const param = useParams();
  const navigator = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  if (!checkPermission(Permission.Read, PermissionGroup.User, auth))
    navigator(-1);

  const [id] = createSignal<string>(param.id);

  const [role] = createResource(id, getRoleDetailApi);

  return (
    <div class="relative">
      <div class="px-4 grid gap-4 grid-cols-1 sm:grid-cols-2 sm:gap-6">
        <dl>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ຊື່
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show when={role()} fallback={"..."}>
              {(role) => role().data.name}
            </Show>
          </dd>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ຄຳອະທິບາຍ
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show when={role()} fallback={"..."}>
              {(role) => role().data.description}
            </Show>
          </dd>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ເພີ່ມເມື່ອ
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show when={role()} fallback={"..."}>
              {(role) => format(role().data.created_at, "dd-MM-y hh:mm:ss")}
            </Show>
          </dd>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ອັບເດດລ່າສຸດເມື່ອ
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show when={role()} fallback={"..."}>
              {(role) => format(role().data.updated_at, "dd-MM-y hh:mm:ss")}
            </Show>
          </dd>
        </dl>

        <dl>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ການອະນຸຍາດ
          </dt>
          <dd class="flex gap-x-1 gap-y-2 flex-wrap">
            <For each={role()?.data.permissions}>
              {({ name }) => (
                <span
                  class="text-xs font-medium me-2 px-2.5 py-0.5 rounded"
                  classList={{
                    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300":
                      name.endsWith("write"),
                    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300":
                      name.endsWith("read"),
                    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300":
                      name.endsWith("remove"),
                  }}
                >
                  {name}
                </span>
              )}
            </For>
          </dd>
        </dl>
      </div>

      <div class="p-4 flex items-center">
        <Show
          when={checkPermission(Permission.Write, PermissionGroup.User, auth)}
        >
          <Button
            class="mr-3"
            color="primary"
            prefixIcon={<EditIcon />}
            onClick={() => {
              navigator(`/user/roles/edit/${param.id}`);
            }}
          >
            ແກ້ໄຂ
          </Button>
        </Show>

        <Show
          when={checkPermission(Permission.Remove, PermissionGroup.User, auth)}
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
                  const res = await deleteRoleApi(param.id);

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
        <Show when={role.loading}>
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
