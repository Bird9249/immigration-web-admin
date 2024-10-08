import { useNavigate } from "@solidjs/router";
import { format } from "date-fns";
import { Show, createResource, createSignal } from "solid-js";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Dropdown from "../../../components/dropdown/Dropdown";
import Select from "../../../components/forms/select/Select";
import Toggle from "../../../components/forms/toggle/Toggle";
import TrashIcon from "../../../components/icons/TrashIcon";
import Table from "../../../components/table/Table";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import deleteFeedbackApi from "./api/delete-feedback.api";
import { FeedbackResponse, FeedbackTableState } from "./api/feedback.inteface";
import getChangeStatusApi from "./api/get-change-status.api";
import getFeedbackApi from "./api/get-feedback.api";

export default () => {
  const navigate = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  if (!checkPermission(Permission.Read, PermissionGroup.Feedback, auth))
    navigate(-1);

  const [state, setState] = createSignal<FeedbackTableState>({
    offset: 0,
    limit: 10,
  });

  const [feedbacks, { refetch }] = createResource(state, getFeedbackApi);

  const actionMenus = (id: number) => {
    const menus: {
      label: string;
      onClick: () => void;
    }[][] = [[]];

    if (checkPermission(Permission.Read, PermissionGroup.Feedback, auth))
      menus[0].push({
        onClick() {
          navigate(`/feedback/${id}`);
        },
        label: "ລາຍລະອຽດ",
      });

    if (checkPermission(Permission.Remove, PermissionGroup.Feedback, auth)) {
      menus.push([]);

      menus[1].push({
        onClick() {
          actionConfirm.showConfirm({
            icon: () => (
              <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
            ),
            message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
            onConfirm: async () => {
              const res = await deleteFeedbackApi(String(id));

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
            ຕາຕະລາງລາຍລະອຽດຄຳຕິຊົມ
          </h2>

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
        </div>
      }
      value={feedbacks}
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
          header: "ຊື",
          body: ({ name }: FeedbackResponse) => (
            <Show when={name} fallback="....">
              <div>{name}</div>
            </Show>
          ),
        },
        {
          header: "ເບີໂທ",
          body: ({ tel }: FeedbackResponse) => (
            <Show when={tel} fallback="....">
              <div>{tel}</div>
            </Show>
          ),
        },
        {
          header: "ອີເມວ",
          body: ({ email }: FeedbackResponse) => email,
        },
        {
          header: "ການເຜີຍແຜ່",
          body: ({ is_published, id }: FeedbackResponse) => (
            <Toggle
              value={is_published}
              onValueChange={async () => {
                await getChangeStatusApi(id, !is_published);
                is_published = !is_published;
              }}
            />
          ),
        },

        {
          header: "ເວລາສ້າງ",
          body: ({ created_at }: FeedbackResponse) => (
            <Show when={created_at} fallback="...">
              {format(created_at, "dd/MM/yyyy HH:mm:ss")}
            </Show>
          ),
        },
        {
          body: ({ id }: FeedbackResponse) => (
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
