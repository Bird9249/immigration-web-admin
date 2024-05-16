import { useNavigate } from "@solidjs/router";
import { Show, createEffect, createResource, createSignal, on } from "solid-js";
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
import { CheckpointCategoryTableState } from "../category/apis/checkpoint-category.interface";
import getCheckpointCategoryApi from "../category/apis/get-checkpoint-category.api";
import getProvinceApi from "../province/api/get-province.api";
import { ProvinceTableState } from "../province/api/province.interface";
import {
  CheckpointResponse,
  CheckpointTableState,
} from "./apis/checkpoint.interface";
import deleteCheckpointApi from "./apis/delete-checkpoint.api";
import getCheckpointApi from "./apis/get-checkpoint.api";

export default () => {
  const navigate = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  if (!checkPermission(Permission.Read, PermissionGroup.Checkpoint, auth))
    navigate(-1);

  const [catState, setCatState] = createSignal<CheckpointCategoryTableState>(
    {}
  );
  const [catOptions, setCatOptions] = createSignal<
    { label: string; value: string }[]
  >([]);
  const [category] = createResource(catState, getCheckpointCategoryApi);
  createEffect(
    on(category, (input) => {
      if (input) {
        setCatOptions([
          {
            label: "ເລືອກປະເພດດ່ານ",
            value: "-1",
          },
          ...input.data.data.map((val) => ({
            label: val.translates[0].title,
            value: String(val.id),
          })),
        ]);
      }
    })
  );

  const [proState, setProState] = createSignal<ProvinceTableState>({});
  const [proOptions, setProOptions] = createSignal<
    { label: string; value: string }[]
  >([]);
  const [province] = createResource(proState, getProvinceApi);
  createEffect(() => {
    if (province.state === "ready") {
      setProOptions([
        {
          label: "ເລືອກແຂວງ",
          value: "-1",
        },
        ...province().data.data.map((val) => ({
          label: val.translates[0].name,
          value: String(val.id),
        })),
      ]);
    }
  });

  const [state, setState] = createSignal<CheckpointTableState>({
    offset: 0,
    limit: 10,
    category_id: "",
    province_id: "",
  });

  const [checkpoints, { refetch }] = createResource(state, getCheckpointApi);

  const actionMenus = (id: number) => {
    const menus: {
      label: string;
      onClick: () => void;
    }[][] = [[]];

    if (checkPermission(Permission.Read, PermissionGroup.Checkpoint, auth))
      menus[0].push({
        onClick() {
          navigate(`/checkpoint/${id}`);
        },
        label: "ລາຍລະອຽດ",
      });

    if (checkPermission(Permission.Write, PermissionGroup.Checkpoint, auth))
      menus[0].push({
        onClick() {
          navigate(`/checkpoint/edit/${id}`);
        },
        label: "ແກ້ໄຂ",
      });

    if (checkPermission(Permission.Remove, PermissionGroup.Checkpoint, auth)) {
      menus.push([]);

      menus[1].push({
        onClick() {
          actionConfirm.showConfirm({
            icon: () => (
              <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
            ),
            message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
            onConfirm: async () => {
              const res = await deleteCheckpointApi(String(id));

              actionMessage.showMessage({
                level: "success",
                message: res.data.message,
              });

              await refetch();
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
            ຕາຕະລາງຂໍ້ມູນດ່ານ
          </h2>

          <div class=" flex items-center justify-end flex-col sm:flex-row gap-2 w-full sm:w-fit">
            <Select
              class="w-full sm:w-fit"
              placeholder="ເລືອກແຂວງ"
              contentClass="w-fit"
              items={proOptions()}
              onValueChange={({ value }) => {
                setState((prev) => ({
                  ...prev,
                  province_id: value[0] === "-1" ? undefined : value[0],
                }));
              }}
            />

            <Select
              class="w-full sm:w-fit"
              placeholder="ເລືອກປະເພດດ່ານ"
              contentClass="w-fit"
              items={catOptions()}
              onValueChange={({ value }) => {
                setState((prev) => ({
                  ...prev,
                  category_id: value[0] === "-1" ? undefined : value[0],
                }));
              }}
            />

            <Show
              when={checkPermission(
                Permission.Write,
                PermissionGroup.Checkpoint,
                auth
              )}
            >
              <Button
                class="w-full sm:w-fit"
                prefixIcon={<PlusIcon class="h-3.5 w-3.5" />}
                onClick={() => {
                  navigate("/checkpoint/create");
                }}
              >
                ເພີ່ມຂໍ້ມູນ
              </Button>
            </Show>
          </div>
        </div>
      }
      value={checkpoints}
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
          header: "ຮູບດ່ານ",
          body: ({ image }: CheckpointResponse) => (
            <div class="flex items-center">
              <img
                src={import.meta.env.VITE_IMG_URL + image}
                alt="no image"
                class="min-w-32 w-60 object-contain h-32 rounded-md"
              />
            </div>
          ),
        },
        {
          header: "ຊື່ດ່ານ",
          body: ({ translates }: CheckpointResponse) => (
            <div>{translates[0].name}</div>
          ),
        },

        {
          header: "ອີເມວຕິດຕໍ່",
          body: ({ email }: CheckpointResponse) => (
            <Show when={email} fallback={"ບໍ່ມິອີເມວຕິດຕໍ່"}>
              {email}
            </Show>
          ),
        },
        {
          header: "ເບີໂທຕິດຕໍ່",
          body: ({ phone_number }: CheckpointResponse) => (
            <Show when={phone_number} fallback={"ບໍ່ມິເບີໂທຕິດຕໍ່"}>
              {phone_number}
            </Show>
          ),
        },
        {
          body: ({ id }: CheckpointResponse) => (
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
