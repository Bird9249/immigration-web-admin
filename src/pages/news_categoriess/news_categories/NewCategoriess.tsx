import { useNavigate } from "@solidjs/router";
import { format } from "date-fns";
import { Show, createResource, createSignal } from "solid-js";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import Dropdown from "../../../components/dropdown/Dropdown";
import PlusIcon from "../../../components/icons/PlusIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Table from "../../../components/table/Table";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import deleteNewsCategoriesApi from "./api/delete-news-categories.api";
import getNewsCategoriesApi from "./api/get-news-categories.api";
import {
  NewCategoriessResponse,
  NewCategoriessTableState,
} from "./api/news-categories.interface";

export default () => {
  const navigate = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  if (!checkPermission(Permission.Read, PermissionGroup.News, auth))
    navigate(-1);

  const [state, setState] = createSignal<NewCategoriessTableState>({
    offset: 0,
    limit: 10,
  });

  const [NewsCategoriess, { refetch }] = createResource(
    state,
    getNewsCategoriesApi
  );

  const actionMenus = (id: number) => {
    const menus: {
      label: string;
      onClick: () => void;
    }[][] = [[]];

    if (checkPermission(Permission.Write, PermissionGroup.News, auth))
      menus[0].push({
        onClick() {
          navigate(`/newsCategoriess/edit/${id}`);
        },
        label: "ແກ້ໄຂ",
      });

    if (checkPermission(Permission.Remove, PermissionGroup.News, auth)) {
      menus.push([]);

      menus[1].push({
        onClick() {
          actionConfirm.showConfirm({
            icon: () => (
              <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
            ),
            message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
            onConfirm: async () => {
              const res = await deleteNewsCategoriesApi(String(id));

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
            ຕາຕະລາງປະເພດຂ່າວ
          </h2>
          <Show
            when={checkPermission(Permission.Write, PermissionGroup.News, auth)}
          >
            <Button
              class="w-full sm:w-fit"
              prefixIcon={<PlusIcon class="h-3.5 w-3.5" />}
              onClick={() => {
                navigate("/newsCategoriess/create");
              }}
            >
              ເພີ່ມຂໍ້ມູນ
            </Button>
          </Show>
        </div>
      }
      value={NewsCategoriess}
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
          header: "ຊືພາສາລາວ",
          body: ({ translates }: NewCategoriessResponse) => (
            <div>{translates[0]?.name}</div>
          ),
        },
        {
          header: "ພາສາອັງກິດ",
          body: ({ translates }: NewCategoriessResponse) => (
            <div>{translates[1]?.name}</div>
          ),
        },
        {
          header: "ພາສາຈີນ",
          body: ({ translates }: NewCategoriessResponse) => (
            <div>{translates[2]?.name}</div>
          ),
        },
        {
          header: "ເພີ່ມເມື່ອ",
          body: ({ created_at }: NewCategoriessResponse) => (
            <Show when={created_at} fallback="...">
              {format(created_at, "dd/MM/yyyy HH:mm:ss")}
            </Show>
          ),
        },
        {
          body: ({ id }: NewCategoriessResponse) => (
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
