import { useNavigate, useParams } from "@solidjs/router";
import { format } from "date-fns";
import { Show, createResource, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";
import {
    Permission,
    PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import EditIcon from "../../../components/icons/EditIcon";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Tabs from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import deleteAccommodationRequestApi from "./api/delete-accommodation-request.api";
import getAccommodationRequestDetailApi from "./api/get-accommodation-request-detail.api";

export default () => {
    const param = useParams();
    const navigator = useNavigate();
    const [, actionConfirm] = useConfirm();
    const [, actionMessage] = useMessage();
    const auth = useAuth();

    const [id] = createSignal<string>(param.id);

    const [accommodationRequests] = createResource(id, getAccommodationRequestDetailApi);

    return (
        <div class="relative">
            <Show when={accommodationRequests()} fallback={<div class="h-[470px]"></div>}>
                {(item) => (
                    <Tabs
                        items={item().data.accommodation_request_translate.map((val) => ({
                            key: val.lang,
                            label:
                                val.lang === "lo"
                                    ? "ພາສາລາວ"
                                    : val.lang === "en"
                                        ? "ພາສາອັງກິດ"
                                        : "ພາສາຈີນ",
                            content: (
                                <div>
                                    <h1 class="font-bold mb-6 text-2xl">
                                        {val.lang === "lo"
                                            ? "ພາສາລາວ"
                                            : val.lang === "en"
                                                ? "ພາສາອັງກິດ"
                                                : "ພາສາຈີນ"}
                                    </h1>
                                </div>
                            ),
                        }))}
                    />
                )}
            </Show>

            <div>
                <dl>
                    <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
                        {/* <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                            ຫົວຂໍ້ຄໍາຮ້ອງຂໍທີ່ພັກ
                        </dt>
                        <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                            <Show when={accommodationRequests()} fallback={"..."}>
                                {(accommodationRequests_titel) =>
                                    (accommodationRequests_titel().data.accommodation_request_translate.map(val))
                                }
                            </Show>
                        </dd> */}
                        <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                            ເວລາສ້າງ:
                        </dt>
                        <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                            <Show when={accommodationRequests()} fallback={"..."}>
                                {(accommodationRequests_created_at) =>
                                    format(accommodationRequests_created_at().data.created_at, "dd/MM/yyyy")
                                }
                            </Show>
                        </dd>
                        <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                            ເວລາອັບເດດ:
                        </dt>
                        <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                            <Show when={accommodationRequests()} fallback={"..."}>
                                {(accommodationRequests_updated_at) =>
                                    format(accommodationRequests_updated_at().data.updated_at, "dd/MM/yyyy")
                                }
                            </Show>
                        </dd>


                    </div>
                </dl>
            </div>
            <div class="p-4 flex items-center">
                <Show
                    when={checkPermission(Permission.Write, PermissionGroup.AccommodationRequest, auth)}
                >
                    <Button
                        class="mr-3"
                        color="primary"
                        prefixIcon={<EditIcon />}
                        onClick={() => {
                            navigator(`/accommodation-request/edit/${param.id}`);
                        }}
                    >
                        ແກ້ໄຂ
                    </Button>
                </Show>

                <Show
                    when={checkPermission(
                        Permission.Remove,
                        PermissionGroup.AccommodationRequest,
                        auth
                    )}
                >
                    <Button
                        color="danger"
                        prefixIcon={<TrashIcon />}
                        onClick={() => {
                            actionConfirm.showConfirm({
                                icon: () => (
                                    <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                                ),
                                message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                                onConfirm: async () => {
                                    const res = await deleteAccommodationRequestApi(param.id);

                                    actionMessage.showMessage({
                                        level: "success",
                                        message: res.data.message,
                                    });
                                },
                            });
                        }}
                    >
                        ລຶບ
                    </Button>
                </Show>
            </div>

            <Transition onEnter={fadeIn} onExit={fadeOut}>
                <Show when={accommodationRequests.loading}>
                    <div
                        class={`absolute z-10 top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center`}
                    >
                        <div>
                            <LoadingIcon class="animate-spin w-8 h-8" />
                        </div>
                    </div>
                </Show>
            </Transition>
        </div>
    );
};