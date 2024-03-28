import { useNavigate, useParams } from "@solidjs/router";
import { format } from "date-fns";
import {  Show, createResource, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";
import Button from "../../../components/button/Button";
import EditIcon from "../../../components/icons/EditIcon";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import deletePopupApi from "./api/delete-popup.api";
import getPopupDetailApi from "./api/get-popup-detail.api";

export default () => {
    const param = useParams();
    const navigator = useNavigate();
    const [, actionConfirm] = useConfirm();
    const [, actionMessage] = useMessage();
    const [id] = createSignal<string>(param.id);

    const [popups] = createResource(id, getPopupDetailApi);

    return (
        <div class="relative">
            <div class="px-4 mb-4 grid gap-4 sm:mb-5 sm:grid-cols-1 sm:gap-6 md:gap-12">
                <dl>
                    <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ຮູບພາບ
                    </dt>
                    <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <Show when={popups()} fallback={"..."}>
                            <img src={import.meta.env.VITE_IMG_URL + popups()?.data.image} alt="no mage" class="w-full h-96" />
                        </Show>
                    </dd>
                </dl>
            </div>
            <div>
                <dl>
                    <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
                        <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                            ເວລາເລີມຕົ້ນ:
                        </dt>
                        <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                            <span class="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                                <Show when={popups()} fallback={"..."}>
                                    {(popup_start_time) => format(popup_start_time().data.start_time, 'dd/MM/yyyy')}
                                </Show>
                            </span>
                        </dd>
                        <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                            ເວລາສິນສຸດ:
                        </dt>
                        <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                            <span class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                                <Show when={popups()} fallback={"..."}>
                                    {(popup_end_time) => format(popup_end_time().data.end_time, 'dd/MM/yyyy')}
                                </Show>
                            </span>
                        </dd>
                        <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                            ລິ້ງ:
                        </dt>
                        <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                            <Show when={popups()} fallback={"..."}>
                                {(popup_link) => popup_link().data.link}
                            </Show>
                        </dd>
                        <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                            ເວລາສ້າງ:
                        </dt>
                        <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                            <span class="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                <Show when={popups()} fallback={"..."}>
                                    {(popup_created_at) => format(popup_created_at().data.created_at, 'dd/MM/yyyy HH:mm:ss')}
                                </Show>
                            </span>
                        </dd>
                        <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                            ເວລາອັບເດດ:
                        </dt>
                        <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                            <span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                <Show when={popups()} fallback={"..."}>
                                    {(popup_updated_at) => format(popup_updated_at().data.updated_at, 'dd/MM/yyyy HH:mm:ss')}
                                </Show>
                            </span>
                        </dd>
                    </div>
                </dl>
            </div>
            <div class="p-4 flex items-center">
                <Button
                    class="mr-3"
                    color="primary"
                    prefixIcon={<EditIcon />}
                    onClick={() => {
                        navigator(`/banner/popup/edit/${param.id}`);
                    }}
                >
                    ແກ້ໄຂ
                </Button>
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
                                const res = await deletePopupApi(param.id);

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

            </div>

            <Transition onEnter={fadeIn} onExit={fadeOut}>
                <Show when={popups.loading}>
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
