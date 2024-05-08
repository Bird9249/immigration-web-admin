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
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import deleteLaw from "./api/delete-law";
import getLawDetailApi from "./api/get-law-detail.api";

export default () => {
    const param = useParams();
    const navigator = useNavigate();
    const [, actionConfirm] = useConfirm();
    const [, actionMessage] = useMessage();
    const [id] = createSignal<string>(param.id);
    const auth = useAuth();

    if (!checkPermission(Permission.Read, PermissionGroup.Law, auth))
        navigator(-1);

    const [laws] = createResource(id, getLawDetailApi);

    return (
        <div class="relative">
            <div>
                <dl>
                    <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">

                        <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                            ໄຟລ໌ເອກະສານ
                        </dt>
                        <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">'
                            <Show when={laws()} fallback={"ບໍ່ມີຂໍ້ມູນ"}>
                                {(law_file) => (
                                    <a
                                        href={import.meta.env.VITE_IMG_URL + law_file().data.file}
                                        class="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                                    >
                                        {import.meta.env.VITE_IMG_URL + law_file().data.file}
                                    </a>
                                )}
                            </Show>
                        </dd>
                        <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                            ຊື
                        </dt>
                        <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                            <Show when={laws()} fallback={"ບໍ່ມີຂໍ້ມູນ"}>
                                {(law_name) => law_name().data.name}
                            </Show>
                        </dd>

                        <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                            ເວລາສ້າງ:
                        </dt>
                        <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                            <Show when={laws()} fallback={"..."}>
                                {(law_created_at) =>
                                    format(
                                        law_created_at().data.created_at,
                                        "dd/MM/yyyy HH:mm:ss"
                                    )
                                }
                            </Show>
                        </dd>
                        <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                            ເວລາອັບເດດ:
                        </dt>
                        <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                            <Show when={laws()} fallback={"..."}>
                                {(law_updated_at) =>
                                    format(
                                        law_updated_at().data.updated_at,
                                        "dd/MM/yyyy HH:mm:ss"
                                    )
                                }
                            </Show>
                        </dd>
                    </div>
                </dl>
            </div >
            <div class="p-4 flex items-center">
                <Show
                    when={checkPermission(Permission.Write, PermissionGroup.Law, auth)}
                >
                    <Button
                        class="mr-3"
                        color="primary"
                        prefixIcon={<EditIcon />}
                        onClick={() => {
                            navigator(`/laws/edit/${param.id}`);
                        }}
                    >
                        ແກ້ໄຂ
                    </Button>
                </Show>

                <Show
                    when={checkPermission(
                        Permission.Remove,
                        PermissionGroup.Law,
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
                                    const res = await deleteLaw(param.id);

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
                <Show when={laws.loading}>
                    <div
                        class={`absolute z-10 top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center`}
                    >
                        <div>
                            <LoadingIcon class="animate-spin w-8 h-8" />
                        </div>
                    </div>
                </Show>
            </Transition>
        </div >
    );
};