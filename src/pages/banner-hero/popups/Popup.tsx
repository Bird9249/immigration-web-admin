import { useNavigate } from "@solidjs/router";
import { Show, createResource, createSignal } from "solid-js";
import Button from "../../../components/button/Button";
import Dropdown from "../../../components/dropdown/Dropdown";
import PlusIcon from "../../../components/icons/PlusIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Table from "../../../components/table/Table";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import deletePopupApi from "./api/delete-popup.api";
import getPopupApi from "./api/get-popup.api";
import { PopupResponse, PopupTableState } from "./api/popup.interface";
import Select from "../../../components/forms/select/Select";
import { format, isWithinInterval } from "date-fns";
import Toggle from "../../../components/forms/toggle/Toggle";
import changeStatusApi from "./api/change-status.api";

export default () => {
  const navigate = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const [statusLoading, setStatusLoading] = createSignal<boolean>(false)

  const [state, setState] = createSignal<PopupTableState>({
    offset: 0,
    limit: 10,
    is_inactive: undefined,
    is_private: undefined
  });

  const [popup, { refetch }] = createResource(state, getPopupApi);

  const actionMenus = (id: number) => {
    const menus: {
      label: string;
      onClick: () => void;
    }[][] = [[]];

    menus[0].push({
      onClick() {
        navigate(`/banner/popup/detail/${id}`);
      },
      label: "ລາຍລະອຽດ",
    });
    menus[0].push({
      onClick() {
        navigate(`/banner/popup/edit/${id}`);
      },
      label: "ແກ້ໄຂ",
    });
    menus.push([]);

    menus[1].push({
      onClick() {
        actionConfirm.showConfirm({
          icon: () => (
            <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
          ),
          message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
          onConfirm: async () => {
            const res = await deletePopupApi(String(id));
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
    return menus;
  };

  return (
    <Table
      header={
        <div class="flex flex-col items-start justify-between border-b dark:border-gray-600 p-4 sm:flex-row sm:items-center">
          <h2 class="text-lg font-semibold mb-2 sm:mb-0 dark:text-white">
            ຕາຕະລາງເກັບຮັກສາຂໍ້ມູນກ່ຽວກັບປ໊ອບອັບ
          </h2>

          <div class=" flex items-center justify-end flex-col sm:flex-row gap-2 w-full">

            <Select
              class="w-full sm:w-fit"
              placeholder="ເລືອກສະຖານະ"
              contentClass="w-44"
              items={[{
                label: "ຍົກເລີກ",
                value: '-1',
              },
              {
                label: "ສາທາລະນະ",
                value: '0',

              },
              {
                label: "ສວນຕົວ",
                value: '1',
              },
              ]
              }
              onValueChange={({ value }) => {

                setState((prev) => ({ ...prev, is_private: value[0] === '-1' ? undefined : value[0] }))

              }}
            ></Select>
            <Select
              class="w-full sm:w-fit"
              placeholder="ເລືອກສະຖານະ"
              contentClass="w-44"
              items={[{
                label: "ຍົກເລີກ",
                value: '-1',
              },
              {
                label: "ສະແດງຢູ່",
                value: '0',

              },
              {
                label: "ບໍ່ສະແດງ",
                value: '1',
              },
              ]
              }
              onValueChange={({ value }) => {
                setState((prev) => ({ ...prev, is_inactive: value[0] === '-1' ? undefined : value[0] }))
              }}
            >
            </Select>

            <Button
              class="w-full sm:w-fit"
              prefixIcon={<PlusIcon class="h-3.5 w-3.5" />}
              onClick={() => {
                navigate("/banner/popup/create");
              }}
            >
              ເພີ່ມຂໍ້ມູນ
            </Button>
          </div>
        </div>
      }
      value={popup}
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
          body: ({ image }: PopupResponse) => (
            <div class="flex items-center w-60">
              <img src={import.meta.env.VITE_IMG_URL + image} alt="no image" class=" w-60 object-contain h-32 rounded-md" />
            </div>
          ),
        },
        {
          header: "ລິ້ງ",
          body: ({ link }: PopupResponse) => (
            <Show when={link} fallback={'ບໍ່ມີລິ້ງ'}>
              <a href={link} class="font-medium text-primary-500 dark:text-primary-500 hover:underline">{link}</a>
            </Show>
          ),
        },
        {
          header: "ເປັນສ່ວນຕົວ",
          body: ({ is_private, id }: PopupResponse) => (
            <Show when={!statusLoading()} fallback={"..."}>
              <Toggle
                value={is_private} onValueChange={async (value) => {
                  setStatusLoading(true)
                  await changeStatusApi(id, !is_private)
                  is_private = !is_private
                  setStatusLoading(false)
                }} />
            </Show>
          )
        },
        {
          header: "ສະຖານະ",
          body: ({ start_time, end_time }: PopupResponse) => (
            <Show when={isWithinInterval(new Date(), { start: start_time, end: end_time })} fallback={<span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">ບໍ່ໄດ້ໃຊ້ງານ</span>}>
              <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">ດຳເນີນການຢູ່</span>
            </Show>
          ),
        },
        {
          header: "ເວລາສ້າງ",
          body: ({ created_at }: PopupResponse) => (

            <Show when={created_at} fallback="...">
              <span class="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                {format(created_at, 'dd-MM-yyyy HH:mm:ss')}
              </span>
            </Show>

          )
        },
        {
          header: "ເວລາອັບເດດ",
          body: ({ updated_at }: PopupResponse) => (
            <Show when={updated_at} fallback="...">
              <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                {format(updated_at, 'dd-MM-yyyy HH:mm:ss')}
              </span>
            </Show>

          )
        },
        {
          body: ({ id }: PopupResponse) => (
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
