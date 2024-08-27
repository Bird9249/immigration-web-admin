import { useNavigate } from "@solidjs/router";
import { format } from "date-fns";
import {
  Match,
  Show,
  Switch,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import Dropdown from "../../../components/dropdown/Dropdown";
import Select from "../../../components/forms/select/Select";
import PlusIcon from "../../../components/icons/PlusIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Table from "../../../components/table/Table";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import getNewsCategoriesApi from "../news_categories/api/get-news-categories.api";
import { NewCategoriessTableState } from "../news_categories/api/news-categories.interface";
import deleteNewsApi from "./api/delete-news.api";
import getNewsApi from "./api/get-news.api";
import { NewResponse, NewTableState } from "./api/news.interface";

export default () => {
  const navigate = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  if (!checkPermission(Permission.Read, PermissionGroup.News, auth))
    navigate(-1);

  const [state, setState] = createSignal<NewTableState>({
    offset: 0,
    limit: 10,
    category_id: "",
    status: undefined,
  });

  const [News, { refetch }] = createResource(state, getNewsApi);

  const [catState, setCatState] = createSignal<NewCategoriessTableState>({});
  const [catOptions, setCatOptions] = createSignal<
    { label: string; value: string }[]
  >([]);
  const [category] = createResource(catState, getNewsCategoriesApi);

  createEffect(() => {
    if (category.state === "ready") {
      setCatOptions([
        {
          label: "ເລືອກປະເພດຂ່າວ",
          value: "-1",
        },
        ...category().data.data.map((val) => ({
          label: val.translates[0].name,
          value: String(val.id),
        })),
      ]);
    }
  });

  const actionMenus = (id: number) => {
    const menus: {
      label: string;
      onClick: () => void;
    }[][] = [[]];

    if (checkPermission(Permission.Read, PermissionGroup.News, auth))
      menus[0].push({
        onClick() {
          navigate(`/newsCategoriess/news/detail/${id}`);
        },
        label: "ລາຍລະອຽດ",
      });

    if (checkPermission(Permission.Write, PermissionGroup.News, auth))
      menus[0].push({
        onClick() {
          navigate(`/newsCategoriess/news/edit/${id}`);
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
              const res = await deleteNewsApi(String(id));

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
            ຕາຕະລາງຂໍ້ມູນຂ່າວສານ
          </h2>

          <div class=" flex items-center justify-end flex-col sm:flex-row gap-2 w-full sm:w-fit">
            <Select
              class="w-full sm:w-fit"
              placeholder="ເລືອກສະຖານະ"
              contentClass="w-fit"
              items={[
                {
                  label: "ເລືອກສະຖານະ",
                  value: "-1",
                },
                {
                  label: "ແບບຮ່າງ",
                  value: "draft",
                },
                {
                  label: "ເຜີຍແຜ່",
                  value: "published",
                },
                {
                  label: "ສ່ວນໂຕ",
                  value: "private",
                },
              ]}
              onValueChange={({ value }) => {
                setState((prev) => ({
                  ...prev,
                  status:
                    value[0] === "-1"
                      ? undefined
                      : (value[0] as "draft" | "published" | "private"),
                }));
              }}
            ></Select>
            <Select
              class="w-full sm:w-fit"
              placeholder="ເລືອກປະເພດຂ່າວ"
              contentClass="w-fit"
              items={catOptions()}
              onValueChange={({ value }) => {
                setState((prev) => ({
                  ...prev,
                  category_id: value[0] === "-1" ? undefined : value[0],
                }));
              }}
            ></Select>

            <Show
              when={checkPermission(
                Permission.Write,
                PermissionGroup.News,
                auth
              )}
            >
              <Button
                class="w-full sm:w-fit"
                prefixIcon={<PlusIcon class="h-3.5 w-3.5" />}
                onClick={() => {
                  navigate("/newsCategoriess/news/create");
                }}
              >
                ເພີ່ມຂໍ້ມູນ
              </Button>
            </Show>
          </div>
        </div>
      }
      value={News}
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
          header: "ຮູບ",
          body: ({ thumbnail }: NewResponse) => (
            <div class="flex items-center">
              <img
                src={import.meta.env.VITE_IMG_URL + thumbnail}
                alt="no image"
                class="min-w-32 w-60 object-contain h-32 rounded-md"
              />
            </div>
          ),
        },
        {
          header: "ຫົວຂໍ້ຂ່າວ",
          body: ({ translates }: NewResponse) => (
            <div class="text-pretty">{translates[0].title}</div>
          ),
        },

        {
          header: "ສະຖານະ",
          body: ({ status }: NewResponse) => (
            <Switch>
              <Match when={status === "draft"}>
                <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                  ແບບຮ່າງ
                </span>
              </Match>
              <Match when={status === "private"}>
                <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                  ສ່ວນໂຕ
                </span>
              </Match>
              <Match when={status === "published"}>
                <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  ເຜີຍແຜ່
                </span>
              </Match>
            </Switch>
          ),
        },

        {
          header: "ເຜືອແຜ່ນເມື່ອ",
          body: ({ public_at }: NewResponse) => (
            <Show when={public_at} fallback="ຍັງບໍ່ໄດ້ເຜືອແຜ່">
              {format(public_at, "dd/MM/yyyy HH:mm:ss")}
            </Show>
          ),
        },

        {
          header: "ເພີ່ມເມື່ອ",
          body: ({ created_at }: NewResponse) => (
            <Show when={created_at} fallback="...">
              {format(created_at, "dd/MM/yyyy HH:mm:ss")}
            </Show>
          ),
        },

        {
          body: ({ id }: NewResponse) => (
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
