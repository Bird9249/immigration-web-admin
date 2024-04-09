import { useNavigate } from "@solidjs/router";
import { format, isWithinInterval } from "date-fns";
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
import { AccommodationRequestResponse, AccommodationRequestTableState } from "./api/accommodation-request.interface";
import deleteAccommodationRequestApi from "./api/delete-accommodation-request.api";
import getAccommodationRequestApi from "./api/get-accommodation-request.api";
export default () => {
    const navigate = useNavigate();
    const [, actionConfirm] = useConfirm();
    const [, actionMessage] = useMessage();
    const auth = useAuth();

    if (!checkPermission(Permission.Read, PermissionGroup.AccommodationRequest, auth))
        navigate(-1);

    const [state, setState] = createSignal<AccommodationRequestTableState>({
        offset: 0,
        limit: 10,
    });

    const [accommodationRequest, { refetch }] = createResource(state, getAccommodationRequestApi);

    const actionMenus = (id: number) => {
        const menus: {
            label: string;
            onClick: () => void;
        }[][] = [[]];

        if (checkPermission(Permission.Read, PermissionGroup.AccommodationRequest, auth))
            menus[0].push({
                onClick() {
                    navigate(`/accommodation-request/detail/${id}`);
                },
                label: "ລາຍລະອຽດ",
            });
        if (checkPermission(Permission.Write, PermissionGroup.AccommodationRequest, auth))
            menus[0].push({
                onClick() {
                    navigate(`/accommodation-request/edit/${id}`);
                },
                label: "ແກ້ໄຂ",
            });

        if (checkPermission(Permission.Remove, PermissionGroup.AccommodationRequest, auth)) {
            menus.push([]);

            menus[1].push({
                onClick() {
                    actionConfirm.showConfirm({
                        icon: () => (
                            <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                        ),
                        message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                        onConfirm: async () => {
                            const res = await deleteAccommodationRequestApi(String(id));
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
                        ຕາຕະລາງນີ້ເກັບຮັກສາຂໍ້ມູນ
                    </h2>

                    <div class=" flex items-center justify-end flex-col sm:flex-row gap-2 w-full sm:w-fit">
                        <Show
                            when={checkPermission(
                                Permission.Write,
                                PermissionGroup.AccommodationRequest,
                                auth
                            )}
                        >
                            <Button
                                class="w-full sm:w-fit"
                                prefixIcon={<PlusIcon class="h-3.5 w-3.5" />}
                                onClick={() => {
                                    navigate("/accommodation-request/create");
                                }}
                            >
                                ເພີ່ມຂໍ້ມູນ
                            </Button>
                        </Show>
                    </div>
                </div>
            }
            value={accommodationRequest}
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
                    header: "ເວລາສ້າງ",
                    body: ({ created_at }: AccommodationRequestResponse) => (
                        <Show when={created_at} fallback="...">
                            {format(created_at, "dd/MM/yyyy HH:mm:ss")}
                        </Show>
                    ),
                },
                {
                    header: "ເວລາອັບເດດ",
                    body: ({ updated_at }: AccommodationRequestResponse) => (
                        <Show when={updated_at} fallback="...">
                            {format(updated_at, "dd/MM/yyyy HH:mm:ss")}
                        </Show>
                    ),
                },
                {
                    body: ({ id }: AccommodationRequestResponse) => (
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