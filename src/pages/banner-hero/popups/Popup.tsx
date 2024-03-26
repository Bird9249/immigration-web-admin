import { useNavigate } from "@solidjs/router";
import { createResource, createSignal } from "solid-js";
import Button from "../../../components/button/Button";
import Dropdown from "../../../components/dropdown/Dropdown";
import PlusIcon from "../../../components/icons/PlusIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Table from "../../../components/table/Table";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import deletePopupApi from "./api/delete-popup.api";
import getPopupApi from "./api/get-popup.api";
import { PopupResponse, PopupTableState } from "./api/popup.interface";
import Select from "../../../components/forms/select/Select";

export default () => {
  const navigate = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  const [state, setState] = createSignal<PopupTableState>({
    offset: 0,
    limit: 10,
    is_inactive: undefined,
    is_private: undefined
  });

  const [banner, { refetch }] = createResource(state, getPopupApi);

  const actionMenus = (id: number) => {
    const menus: {
      label: string;
      onClick: () => void;
    }[][] = [[]];

    menus[0].push({
      onClick() {
        navigate(`/popup/detail/${id}`);
      },
      label: "ລາຍລະອຽດ",
    });


    menus[0].push({
      onClick() {
        navigate(`/popup/edit/${id}`);
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
          <div class="w-full sm:w-fit mt-2">
            <Select
              placeholder="ເລືອກສະຖານະ"
              contentClass="w-44"
              items={[{
                label: "ຍົກເລີກ",
                value: undefined,
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
                setState((prev) => ({ ...prev, is_private: value[0] }))
              }}
            ></Select>
          </div>
          <div class="w-full sm:w-fit mt-2">
            <Select
              placeholder="ເລືອກສະຖານະ"
              contentClass="w-44"
              items={[{
                label: "ຍົກເລີກ",
                value: undefined,
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
                setState((prev) => ({ ...prev, is_inactive: value[0] }))
              }}
            >
            </Select>
          </div>

          <Button
            class="w-full sm:w-fit"
            prefixIcon={<PlusIcon class="h-3.5 w-3.5" />}
            onClick={() => {
              navigate("/banner/create");
            }}
          >
            ເພີ່ມຂໍ້ມູນ
          </Button>
        </div>
      }
      value={banner}
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
          body: ({ }: PopupResponse) => (
            <div class="flex items-center">

            </div>
          ),
        },
        {
          header: "ລິ້ງ",
          body: () => (
            <div class="flex items-center">
              <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
              LINK
            </div>
          ),
        },
        {
          header: "ສະຖານະ",
          body: () => (
            <div class="flex items-center">
              <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
              is_private
            </div>
          ),
        },
        {
          header: "ເວລາເລີມ",
          body: () => (
            <div class="flex items-center">
              <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
              start_time
            </div>
          ),
        },
        {
          header: "ເວລາສິນສຸດ",
          body: () => (
            <div class="flex items-center">
              <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
              end_time
            </div>
          ),
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
