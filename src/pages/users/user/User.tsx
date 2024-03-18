import { useNavigate } from "@solidjs/router";
import { format } from "date-fns";
import { For, Show, createResource, createSignal } from "solid-js";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Avatar from "../../../components/avatar/Avatar";
import Button from "../../../components/button/Button";
import Dropdown from "../../../components/dropdown/Dropdown";
import PlusIcon from "../../../components/icons/PlusIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Table from "../../../components/table/Table";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import deleteUserApi from "./api/delete-user.api";
import getUserApi from "./api/get-user.api";
import { UserResponse, UserTableState } from "./api/user.interface";

export default () => {
  const navigate = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  if (!checkPermission(Permission.Read, PermissionGroup.User, auth))
    navigate(-1);

  const [state, setState] = createSignal<UserTableState>({
    offset: 0,
    limit: 10,
  });

  const [users, { refetch }] = createResource(state, getUserApi);

  const actionMenus = (id: number) => {
    const menus: {
      label: string;
      onClick: () => void;
    }[][] = [[]];

    if (checkPermission(Permission.Read, PermissionGroup.User, auth))
      menus[0].push({
        onClick() {
          navigate(`/users/detail/${id}`);
        },
        label: "ລາຍລະອຽດ",
      });

    if (checkPermission(Permission.Write, PermissionGroup.User, auth))
      menus[0].push({
        onClick() {
          navigate(`/users/edit/${id}`);
        },
        label: "ແກ້ໄຂ",
      });

    if (checkPermission(Permission.Remove, PermissionGroup.User, auth)) {
      menus.push([]);

      menus[1].push({
        onClick() {
          actionConfirm.showConfirm({
            icon: () => (
              <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
            ),
            message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
            onConfirm: async () => {
              const res = await deleteUserApi(String(id));

              actionMessage.showMessage({
                level: "success",
                message: res.data.message,
              });

              refetch();
            },
          });
        },
        label: "ລຶບ",
      });
    }

    return menus;
  };

  return (
    <Table
      header={
        <div class="flex flex-col items-start justify-between border-b dark:border-gray-600 p-4 sm:flex-row sm:items-center">
          <h2 class="text-lg font-semibold mb-2 sm:mb-0 dark:text-white">
            ຜູ້ໃຊ້ທັງໝົດ
          </h2>
          <Show
            when={checkPermission(Permission.Write, PermissionGroup.User, auth)}
          >
            <Button
              class="w-full sm:w-fit"
              prefixIcon={<PlusIcon class="h-3.5 w-3.5" />}
              onClick={() => {
                navigate("/users/create");
              }}
            >
              ເພີ່ມຜູ້ໃຊ້
            </Button>
          </Show>
        </div>
      }
      value={users}
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
          header: "ຜູ້ໃຊ້",
          body: ({
            profile: { image, first_name, last_name },
          }: UserResponse) => (
            <div class="flex items-center">
              <Avatar
                src={
                  image ? import.meta.env.VITE_BASE_API_URL + image : undefined
                }
                alt="image"
                size="sm"
                class="mr-3"
              />
              <span>
                {first_name} {last_name}
              </span>
            </div>
          ),
        },
        {
          header: "ບົດບາດ",
          body: ({ roles }: UserResponse) => (
            <For each={roles}>
              {({ name }) => (
                <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  {name}
                </span>
              )}
            </For>
          ),
        },
        {
          header: "ອີເມວ",
          body: ({ email }: UserResponse) => email,
        },
        {
          header: "ເຂົ້າລະບົບລ່າສຸດ",
          body: ({ session }: UserResponse) =>
            session
              ? format(session.created_at, "dd-MM-y hh:mm:ss")
              : "ບໍ່ມີການເຂົ້າສູ່ລະບົບ",
        },
        {
          body: ({ id }: UserResponse) => (
            <Dropdown
              triggerEl={
                <button class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-1 inline-flex items-center justify-center">
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              }
              menus={actionMenus(id)}
            />
          ),
        },
      ]}
    </Table>
  );
};
