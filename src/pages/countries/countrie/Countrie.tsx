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
// import Toggle from "../../../components/forms/toggle/Toggle";
import Select from "../../../components/forms/select/Select";
import PlusIcon from "../../../components/icons/PlusIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Table from "../../../components/table/Table";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import {
  CountriesTableState,
  CountryResponse,
} from "./api/countries.interface";
import deleteCountriesApi from "./api/delete-countries.api";
import getCountriesApi from "./api/get-countries.api";
export default () => {
  const navigate = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  if (!checkPermission(Permission.Read, PermissionGroup.Countries, auth))
    navigate(-1);

  const [state, setState] = createSignal<CountriesTableState>({
    offset: 0,
    limit: 10,
    is_except_visa: "-1",
  });

  const [countries, { refetch }] = createResource(state, getCountriesApi);

  const actionMenus = (id: number) => {
    const menus: {
      label: string;
      onClick: () => void;
    }[][] = [[]];

    if (checkPermission(Permission.Read, PermissionGroup.Countries, auth))
      menus[0].push({
        onClick() {
          navigate(`/countries/detail/${id}`);
        },
        label: "ລາຍລະອຽດ",
      });
    if (checkPermission(Permission.Write, PermissionGroup.Countries, auth))
      menus[0].push({
        onClick() {
          navigate(`/countries/edit/${id}`);
        },
        label: "ແກ້ໄຂ",
      });

    if (checkPermission(Permission.Remove, PermissionGroup.Countries, auth)) {
      menus.push([]);

      menus[1].push({
        onClick() {
          actionConfirm.showConfirm({
            icon: () => (
              <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
            ),
            message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
            onConfirm: async () => {
              const res = await deleteCountriesApi(String(id));
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
            ຕາຕະລາງເກັບຮັກສາຂໍ້ມູນປະເທດ
          </h2>

          <div class=" flex items-center justify-end flex-col sm:flex-row gap-2 w-full sm:w-fit">
            <Select
              class="w-full sm:w-fit"
              placeholder="ເລືອກປະເທດທີ່ຍົກເວັ້ນວີຊ້າ"
              contentClass="w-44"
              items={[
                {
                  label: "ເລືອກປະເທດທີ່ຍົກເວັ້ນວີຊາ",
                  value: "-1",
                },
                {
                  label: "ຕ້ອງການວີຊາ",
                  value: "0",
                },
                {
                  label: "ຍົກເວັ້ນວີຊາ",
                  value: "1",
                },
              ]}
              onValueChange={({ value }) => {
                setState((prev) => ({
                  ...prev,
                  is_except_visa: value[0] as "-1" | "0" | "1",
                }));
              }}
            ></Select>
            <Show
              when={checkPermission(
                Permission.Write,
                PermissionGroup.Countries,
                auth
              )}
            >
              <Button
                class="w-full sm:w-fit"
                prefixIcon={<PlusIcon class="h-3.5 w-3.5" />}
                onClick={() => {
                  navigate("/countries/create");
                }}
              >
                ເພີ່ມຂໍ້ມູນ
              </Button>
            </Show>
          </div>
        </div>
      }
      value={countries}
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
          body: ({ image }: CountryResponse) => (
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
          header: "ຊື່",
          body: ({ translates }: CountryResponse) => (
            <div>{translates[0].name}</div>
          ),
        },
        {
          header: "ຍົກເວັ້ນວິຊາ",
          body: ({ is_except_visa }: CountryResponse) => (
            <div class="flex items-center">
              <div
                class="border rounded-full size-3 mr-2"
                classList={{
                  "bg-green-500": is_except_visa,
                  "bg-red-500": !is_except_visa,
                }}
              ></div>
              {is_except_visa ? "ຍົກເວັ້ນວິຊາ" : "ຕ້ອງການວີຊາ"}
            </div>
          ),
        },
        {
          header: "ເວລາສ້າງ",
          body: ({ created_at }: CountryResponse) => (
            <Show when={created_at} fallback="...">
              {format(created_at, "dd/MM/yyyy HH:mm:ss")}
            </Show>
          ),
        },

        {
          body: ({ id }: CountryResponse) => (
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
