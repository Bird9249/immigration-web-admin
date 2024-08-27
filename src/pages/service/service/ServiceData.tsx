import { useNavigate } from "@solidjs/router";
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
import Tabs from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import deleteServiceApi from "./api/delete-service.api";
import getServiceApi from "./api/get-service.api";
import { ServiceResponse, ServiceTableState } from "./api/service.interface";

export default () => {
  const navigate = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  if (!checkPermission(Permission.Read, PermissionGroup.Service, auth))
    navigate(-1);

  const [state, setState] = createSignal<ServiceTableState>({
    offset: 0,
    limit: 10,
    lang: "lo",
  });

  const [services, { refetch }] = createResource(state, getServiceApi);

  const actionMenus = (id: number) => {
    const menus: {
      label: string;
      onClick: () => void;
    }[][] = [[]];

    if (checkPermission(Permission.Write, PermissionGroup.Service, auth))
      menus[0].push({
        onClick() {
          navigate(`/service/edit/${id}`);
        },
        label: "ແກ້ໄຂ",
      });

    if (checkPermission(Permission.Remove, PermissionGroup.Service, auth)) {
      menus.push([]);

      menus[1].push({
        onClick() {
          actionConfirm.showConfirm({
            icon: () => (
              <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
            ),
            message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
            onConfirm: async () => {
              const res = await deleteServiceApi(String(id));

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
    <div class="relative">
      <Tabs
        items={[
          { label: "ພາສາລາວ", key: "lo" },
          { label: "ພາສາອັງກິດ", key: "en" },
          { label: "ພາສາຈີນ", key: "zh_cn" },
        ]}
        contents={[{ key: "lo" }, { key: "en" }, { key: "zh_cn" }].map(
          (val) => ({
            ...val,
            content: <></>,
          })
        )}
        onValueChange={async (value) => {
          setState((prev) => ({
            ...prev,
            lang: value as "lo" | "en" | "zh_cn",
          }));
        }}
      />

      <Table
        header={
          <div class="flex flex-col items-start justify-between border-b dark:border-gray-600 p-4 sm:flex-row sm:items-center">
            <h2 class="text-lg font-semibold mb-2 sm:mb-0 dark:text-white">
              ບໍລິການທັງໝົດ
            </h2>
            <Show
              when={checkPermission(
                Permission.Write,
                PermissionGroup.Service,
                auth
              )}
            >
              <Button
                class="w-full sm:w-fit"
                prefixIcon={<PlusIcon class="h-3.5 w-3.5" />}
                onClick={() => {
                  navigate("/service/create");
                }}
              >
                ເພີ່ມບໍລິການ
              </Button>
            </Show>
          </div>
        }
        value={services as any}
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
            header: "ຊື່ບໍລິການ",
            body: ({ title }: ServiceResponse) => title,
          },

          {
            body: ({ id }: ServiceResponse) => (
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
    </div>
  );
};
