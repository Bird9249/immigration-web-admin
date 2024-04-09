import { useNavigate, useParams } from "@solidjs/router";
import { format } from "date-fns";
import { For, Show, createResource, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Avatar from "../../../components/avatar/Avatar";
import Button from "../../../components/button/Button";
import EditIcon from "../../../components/icons/EditIcon";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import deleteUserApi from "./api/delete-user.api";
import getUserDetailApi from "./api/get-user-detail.api";

export default () => {
  const param = useParams();
  const navigator = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  const [id] = createSignal<string>(param.id);

  const [user] = createResource(id, getUserDetailApi);

  return (
    <div class="relative">
      <div class="px-4 mb-4 grid gap-4 sm:mb-5 sm:grid-cols-3 sm:gap-6 md:gap-12">
        <div class="sm:col-span-2">
          <div class="flex items-center">
            <Avatar
              alt={`${user()?.data.profile.first_name} ${
                user()?.data.profile.last_name
              }`}
              size="xl"
              src={
                user()?.data.profile.image
                  ? import.meta.env.VITE_IMG_URL + user()?.data.profile.image
                  : undefined
              }
              isLoading={user.loading}
              class="mb-4 sm:mb-5"
            />
            <div class="ml-4">
              <h2 class="text-gray-900 leading-4 font-bold text-xl flex items-center mb-2 sm:text-2xl dark:text-white">
                {user()
                  ? `${user()?.data.profile.first_name} ${
                      user()?.data.profile.last_name
                    }`
                  : "... ..."}
              </h2>
              <div class="flex items-center gap-2">
                <For each={user()?.data.roles}>
                  {({ name }) => (
                    <span class="bg-primary-100 text-primary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                      {name}
                    </span>
                  )}
                </For>
              </div>
            </div>
          </div>
        </div>

        <dl>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ທີ່​ຢູ່​ອີ​ເມວ
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show when={user()} fallback={"..."}>
              {(user) => user().data.email}
            </Show>
          </dd>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ເຂົ້າລະບົບລ່າສຸດ
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show when={user()} fallback={"..."}>
              {(val) => (
                <Show
                  when={val().data.session}
                  fallback={"ບໍ່ມີການເຂົ້າສູ່ລະບົບ"}
                >
                  {(session) =>
                    format(session().created_at, "dd-MM-y hh:mm:ss")
                  }
                </Show>
              )}
            </Show>
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
              navigator(`/users/edit/${param.id}`);
            }}
          >
            ແກ້ໄຂ
          </Button>
        </Show>

        <Show
          when={
            checkPermission(Permission.Remove, PermissionGroup.User, auth) &&
            user()?.data.id !== auth.id
          }
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
                  const res = await deleteUserApi(param.id);

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
        <Show when={user.loading}>
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
