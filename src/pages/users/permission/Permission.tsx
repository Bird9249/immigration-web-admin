import { useNavigate } from "@solidjs/router";
import { For, Show, Suspense, createEffect, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import { Transition } from "solid-transition-group";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import getPermissionApi from "./api/get-permission.api";
import { GroupedPermission } from "./api/permission.interface";
import convertPermissions from "./utils/convert-permissions";

export default () => {
  const navigate = useNavigate();
  const auth = useAuth();

  if (!checkPermission(Permission.Read, PermissionGroup.User, auth))
    navigate(-1);

  const [permissions] = createResource(getPermissionApi);
  const [permissionOptions, setPermissionOptions] = createStore<{
    data: GroupedPermission[] | undefined;
  }>({ data: undefined });

  createEffect(() => {
    if (permissions.state === "ready") {
      setPermissionOptions("data", convertPermissions(permissions().data));
    }
  });

  return (
    <div class="relative min-h-[90vh]">
      <h2 class="text-lg font-semibold mb-2 sm:mb-3 dark:text-white">
        ຜູ້ໃຊ້ທັງໝົດ
      </h2>
      <ol class="text-gray-500 list-decimal list-inside dark:text-gray-400 grid gap-4 sm:grid-cols-2 sm:gap-6">
        <Suspense>
          <For each={permissionOptions.data}>
            {({ group, items }) => (
              <li>
                {group.toUpperCase()}
                <ul class="ps-5 mt-2 space-y-1 list-disc list-inside">
                  <For each={items}>
                    {({ label, description }, idx) => (
                      <li>
                        <span
                          class="text-xs font-medium me-2 px-2.5 py-0.5 rounded"
                          classList={{
                            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300":
                              idx() === 0,
                            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300":
                              idx() === 1,
                            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300":
                              idx() === 2,
                            "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300":
                              idx() === 0 && idx() === 1 && idx() === 2,
                          }}
                        >
                          {label}
                        </span>
                        : {description}
                      </li>
                    )}
                  </For>
                </ul>
              </li>
            )}
          </For>
        </Suspense>
      </ol>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={permissions.loading}>
          <div
            class={`absolute z-10 top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center rounded-lg`}
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
