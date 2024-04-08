import { A, useNavigate } from "@solidjs/router";
import { format } from "date-fns";
import { For, Show, createResource, createSignal } from "solid-js";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import PlusIcon from "../../../components/icons/PlusIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Table from "../../../components/table/Table";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import deleteRoleApi from "./api/delete-role.api";
import getRoleApi from "./api/get-role.api";
import { RoleResponse, RoleTableState } from "./api/role.interface";

export default () => {
  const navigate = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  if (!checkPermission(Permission.Read, PermissionGroup.User, auth))
    navigate(-1);

  const [state, setState] = createSignal<RoleTableState>({
    offset: 0,
    limit: 10,
  });

  const [roles, { refetch }] = createResource(state, getRoleApi);

  return (
    <Table
      header={
        <div class="flex flex-col items-start justify-between p-4 sm:flex-row sm:items-center">
          <h2 class="text-lg font-semibold mb-2 sm:mb-0 dark:text-white">
            ບົດບາດທັງຫມົດ
          </h2>
          <Show
            when={checkPermission(Permission.Write, PermissionGroup.User, auth)}
          >
            <Button
              class="w-full sm:w-fit"
              prefixIcon={<PlusIcon class="h-3.5 w-3.5" />}
              onClick={() => {
                navigate("create");
              }}
            >
              ເພີ່ມບົດບາດ
            </Button>
          </Show>
        </div>
      }
      value={roles}
      responseField="data"
      onChange={({ paginate }) => {
        setState((prev) => ({
          ...prev,
          limit: paginate.limit,
          offset: paginate.offset,
        }));
      }}
    >
      {[
        {
          header: "ຊື່",
          body: ({ name }: RoleResponse) => name,
        },
        {
          header: "ຄຳອະທິບາຍ",
          body: ({ description }: RoleResponse) => description,
        },
        {
          header: "ວັນທີ່ເພີ່ມ",
          body: ({ created_at }: RoleResponse) =>
            format(created_at, "dd-MM-y hh:mm:ss"),
        },
        {
          header: "ການອະນຸຍາດ",
          body: ({ permissions }: RoleResponse) => (
            <div class="flex gap-1 flex-wrap">
              <For each={permissions}>
                {({ name }) => (
                  <span class="bg-primary-100 text-primary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    {name}
                  </span>
                )}
              </For>
            </div>
          ),
        },
        {
          header: "ຈັດການ",
          body: ({ id }: RoleResponse) => (
            <div class="flex items-center">
              <Show
                when={checkPermission(
                  Permission.Write,
                  PermissionGroup.User,
                  auth
                )}
              >
                <A
                  href={`edit/${id}`}
                  class="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  ແກ້ໄຂ
                </A>
              </Show>

              <Show
                when={checkPermission(
                  Permission.Remove,
                  PermissionGroup.User,
                  auth
                )}
              >
                <a
                  href="#"
                  onClick={() => {
                    actionConfirm.showConfirm({
                      icon: () => (
                        <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                      ),
                      message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                      onConfirm: async () => {
                        const res = await deleteRoleApi(String(id));

                        actionMessage.showMessage({
                          level: "success",
                          message: res.data.message,
                        });

                        refetch();
                      },
                    });
                  }}
                  class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                >
                  ລຶບ
                </a>
              </Show>
            </div>
          ),
        },
      ]}
    </Table>
  );
};
