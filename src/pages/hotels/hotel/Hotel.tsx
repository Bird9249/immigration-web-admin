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
import deleteHotelApi from "./api/delete-hotel.api";
import getHotelApi from "./api/get-hotel.api";
import { HotelResponse, HotelTableState } from "./api/hotel.interface";

export default () => {
    const navigate = useNavigate();
    const [, actionConfirm] = useConfirm();
    const [, actionMessage] = useMessage();
    const auth = useAuth();

    if (!checkPermission(Permission.Read, PermissionGroup.User, auth))
        navigate(-1);

    const [state, setState] = createSignal<HotelTableState>({
        offset: 0,
        limit: 10,
    });

    const [hotels, { refetch }] = createResource(state, getHotelApi);

    const actionMenus = (id: number) => {
        const menus: {
            label: string;
            onClick: () => void;
        }[][] = [[]];

        if (checkPermission(Permission.Read, PermissionGroup.User, auth))
            menus[0].push({
                onClick() {
                    navigate(`/hotels/detail/${id}`);
                },
                label: "ລາຍລະອຽດ",
            });

        if (checkPermission(Permission.Write, PermissionGroup.User, auth))
            menus[0].push({
                onClick() {
                    navigate(`/hotels/edit/${id}`);
                },
                label: "ແກ້ໄຂ",
            });

        if (checkPermission(Permission.Remove, PermissionGroup.User, auth)) {
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
                    <Show
                        when={checkPermission(Permission.Write, PermissionGroup.User, auth)}
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
                        <Show when={image} fallback="ບໍ່ມີຮູບ">
                            {image}
                        </Show>
                    ),
                },
                {
                    header: "ລິ້ງ",
                    body: ({ link }: HotelResponse) => (
                        <Show when={link} fallback="ບໍ່ມີລິ້ງ">
                            <a href={link} class="font-medium text-primary-600 dark:text-primary-500 hover:underline"></a>
                        </Show>
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
                    body: ({ is_published }: HotelResponse) => (
                        <Show when={is_published} fallback="ບໍ່ມີຂໍ້ມູນ">
                            {is_published}
                        </Show>
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
                    header: "ເວລາອັບເດດ",
                    body: ({ updated_at }: HotelResponse) => (
                        <Show when={updated_at} fallback="...">
                            {format(updated_at, "dd/MM/yyyy HH:mm:ss")}
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
