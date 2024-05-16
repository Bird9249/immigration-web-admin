import { useNavigate } from "@solidjs/router";
import { format } from "date-fns";
import { For, Show, createResource, createSignal } from "solid-js";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import Dropdown from "../../../components/dropdown/Dropdown";
import Select from "../../../components/forms/select/Select";
import Toggle from "../../../components/forms/toggle/Toggle";
import PlusIcon from "../../../components/icons/PlusIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Table from "../../../components/table/Table";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import deleteHotelApi from "./api/delete-hotel.api";
import getHotelApi from "./api/get-hotel.api";
import changeStatusHotel from "./api/get-status.api";
import { HotelResponse, HotelTableState } from "./api/hotel.interface";

export default () => {
  const navigate = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  if (!checkPermission(Permission.Read, PermissionGroup.Hotel, auth))
    navigate(-1);

  const [state, setState] = createSignal<HotelTableState>({
    offset: 0,
    limit: 10,
    is_published: undefined,
  });

  const [hotels, { refetch }] = createResource(state, getHotelApi);

  const actionMenus = (id: number) => {
    const menus: {
      label: string;
      onClick: () => void;
    }[][] = [[]];

    if (checkPermission(Permission.Read, PermissionGroup.Hotel, auth))
      menus[0].push({
        onClick() {
          navigate(`/hotels/detail/${id}`);
        },
        label: "ລາຍລະອຽດ",
      });

    if (checkPermission(Permission.Write, PermissionGroup.Hotel, auth))
      menus[0].push({
        onClick() {
          navigate(`/hotels/edit/${id}`);
        },
        label: "ແກ້ໄຂ",
      });

    if (checkPermission(Permission.Remove, PermissionGroup.Hotel, auth)) {
      menus.push([]);

      menus[1].push({
        onClick() {
          actionConfirm.showConfirm({
            icon: () => (
              <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
            ),
            message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
            onConfirm: async () => {
              const res = await deleteHotelApi(String(id));

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
            ຕາຕະລາງຂໍ້ມູນໂຮງແຮມ
          </h2>
          <div class=" flex items-center justify-end flex-col sm:flex-row gap-2 w-full sm:w-fit">
            <Select
              class="w-full sm:w-fit"
              placeholder="ການເຜີຍແຜ່"
              contentClass="w-44"
              items={[
                {
                  label: "ການເຜີຍແຜ່",
                  value: "-1",
                },
                {
                  label: "ສາທາລະນະ",
                  value: "1",
                },
                {
                  label: "ສວນຕົວ",
                  value: "0",
                },
              ]}
              onValueChange={({ value }) => {
                setState((prev) => ({
                  ...prev,
                  is_published: value[0] === "-1" ? undefined : value[0],
                }));
              }}
            ></Select>

            <Show
              when={checkPermission(
                Permission.Write,
                PermissionGroup.Hotel,
                auth
              )}
            >
              <Button
                class="w-full sm:w-fit"
                prefixIcon={<PlusIcon class="h-3.5 w-3.5" />}
                onClick={() => {
                  navigate("/hotels/create");
                }}
              >
                ເພີ່ມຂໍ້ມູນໂຮງແຮມ
              </Button>
            </Show>
          </div>
        </div>
      }
      value={hotels}
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
          body: ({ image }: HotelResponse) => (
            <div class="flex items-center w-60">
              <img
                src={import.meta.env.VITE_IMG_URL + image}
                alt="no image"
                class="w-60 object-contain h-32 rounded-md"
              />
            </div>
          ),
        },
        {
          header: "ຊື່ຂອງໂຮງແຮມ",
          body: ({ translates }: HotelResponse) => (
            <For each={translates}>
              {({ lang, name }) => (
                <p class="leading-6">
                  {lang === "lo"
                    ? "ລາວ:"
                    : lang === "en"
                    ? "ອັງກິດ:"
                    : lang === "zh_cn"
                    ? "ຈີນ:"
                    : ""}{" "}
                  {name}
                </p>
              )}
            </For>
          ),
        },
        {
          header: "ເບີໂທ",
          body: ({ phone_number }: HotelResponse) => (
            <Show when={phone_number} fallback="ບໍ່ມີຂໍ້ມູນ">
              {phone_number}
            </Show>
          ),
        },
        {
          header: "ສະຖານະ",
          body: ({ id, is_published }: HotelResponse) => (
            <Toggle
              value={is_published}
              onValueChange={async () => {
                await changeStatusHotel(id, is_published);
                is_published = !is_published;
              }}
            />
          ),
        },
        {
          header: "ເວລາສ້າງ",
          body: ({ created_at }: HotelResponse) => (
            <Show when={created_at} fallback="...">
              {format(created_at, "dd/MM/yyyy HH:mm:ss")}
            </Show>
          ),
        },
        {
          body: ({ id }: HotelResponse) => (
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
