import { useNavigate, useParams } from "@solidjs/router";
import { format } from "date-fns";
import { For, Show, createResource, createSignal } from "solid-js";
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
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import deleteHotelApi from "./api/delete-hotel.api";
import getHotelDetailApi from "./api/get-hotel-detail.api";
import Map from "../../../components/map/Map";
import Tabs from "../../../components/tabs/Tabs";

export default () => {
    const param = useParams();
    const navigator = useNavigate();
    const [, actionConfirm] = useConfirm();
    const [, actionMessage] = useMessage();
    const auth = useAuth();

    const [id] = createSignal<string>(param.id);

    const [hotel] = createResource(id, getHotelDetailApi);

    return (
        <div class="relative">
            {/* <Show when={hotel()} fallback={<div class="h-[470px]"></div>}>
                {(item) => (
                    <Tabs
                        items={item().data.translates.map((val) => ({
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
                                    <div class="mb-4 grid gap-4 sm:mb-5 sm:grid-cols-1 sm:gap-6 md:gap-12">
                                        <dl>
                                            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                                                ຮູບພາບ
                                            </dt>
                                            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                                                <div class="relative w-full mx-auto">
                                                    <img
                                                        class="w-full object-cover rounded-md"
                                                        src={
                                                            import.meta.env.VITE_IMG_URL + item().data.image
                                                        }
                                                        alt="Random image"
                                                    />
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            ),
                        }))}
                    />
                )}
            </Show> */}
            <div class="px-4 mb-4 grid gap-4 sm:mb-5 sm:grid-cols-2 sm:gap-6 md:gap-12">
                <dl>
                    <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ຮູບພາບ
                    </dt>
                    <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <div class="relative w-full mx-auto">
                            <img
                                class="w-full object-cover rounded-md"
                                src={
                                    import.meta.env.VITE_IMG_URL + hotel()?.data.image
                                }
                                alt="No image"
                            />
                        </div>
                    </dd>
                </dl>
                <dl>
                    <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ຕຳແໜ່ງເສັ້ນຂະໜານຂອງໂຮງແຮມ
                    </dt>
                    <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <Show when={hotel()?.data.latitude} fallback={"ບໍ່ມີຂໍ້ມູນ"}>
                            {(hotel_latitude) => hotel_latitude()}
                        </Show>
                    </dd>
                    <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ເບີໂທ
                    </dt>
                    <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <Show when={hotel()?.data.phone_number} fallback={"ບໍ່ມີຂໍ້ມູນ"}>
                            {(hotel_phone_number) => hotel_phone_number()}
                        </Show>
                    </dd>
                    <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ລິ້ງ
                    </dt>
                    <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <Show when={hotel()?.data.link} fallback={"ບໍ່ມີຂໍ້ມູນ"}>
                            {(hotel_link) => hotel_link()}
                        </Show>
                    </dd>
                    <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ຕຳແໜ່ງທາງຍາວຂອງໂຮງແຮມ
                    </dt>
                    <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <Show when={hotel()?.data.longitude} fallback={"ບໍ່ມີຂໍ້ມູນ"}>
                            {(hotel_longitude) => hotel_longitude()}
                        </Show>
                    </dd>
                    <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ເວລາສ້າງ:
                    </dt>
                    <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <Show when={hotel()?.data.created_at} fallback={"ບໍ່ມີຂໍ້ມູນເວລາສ້າງ"}>
                            {(hotel_created_at) =>
                                format(
                                    hotel_created_at(),
                                    "dd/MM/yyyy HH:mm:ss"
                                )
                            }
                        </Show>
                    </dd>
                    <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ເວລາອັບເດດ:
                    </dt>
                    <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <Show when={hotel()?.data.updated_at} fallback={"ບໍ່ມີຂໍ້ມູນເວລາອັບເດດ"}>
                            {(hotel_updated_at) =>
                                format(
                                    hotel_updated_at(),
                                    "dd/MM/yyyy HH:mm:ss"
                                )
                            }
                        </Show>
                    </dd>
                </dl>
            </div>
            <Map />
            <div class="p-4 flex items-center">
                <Show
                    when={checkPermission(Permission.Write, PermissionGroup.User, auth)}
                >
                    <Button
                        class="mr-3"
                        color="primary"
                        prefixIcon={<EditIcon />}
                        onClick={() => {
                            navigator(`/hotels/edit/${param.id}`);
                        }}
                    >
                        ແກ້ໄຂ
                    </Button>
                </Show>

                <Show
                    when={checkPermission(Permission.Remove, PermissionGroup.User, auth)}
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
                                    const res = await deleteHotelApi(param.id);

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
                <Show when={hotel.loading}>
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
