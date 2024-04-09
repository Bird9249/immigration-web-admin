import {
    SubmitHandler,
    createForm,
    reset,
    setValue,
    setValues,
    valiForm,
} from "@modular-forms/solid";
import { useNavigate, useParams } from "@solidjs/router";
import {
    Show,
    createEffect,
    createResource,
    createSignal,
    on,
    onMount,
} from "solid-js";
import { Transition } from "solid-transition-group";
import {
    Permission,
    PermissionGroup,
} from "../../../common/enum/permission.enum";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import { AccommodationRequestForm, AccommodationRequestSchema } from "./schemas/accommodation_request.schemas";
import { initAccordions } from "flowbite";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import InputText from "../../../components/forms/input-text/InputText";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import deleteAccommodationRequestApi from "./api/delete-accommodation-request.api";
import getAccommodationRequestDetailApi from "./api/get-accommodation-request-detail.api";
import updateAccommodationRequestApi from "./api/update-accommodation-request.api";
import { format } from "date-fns";
import Textarea from "../../../components/forms/textarea/Textarea";

export default () => {
    const param = useParams();
    const [, actionConfirm] = useConfirm();
    const [, actionMessage] = useMessage();
    const navigator = useNavigate();
    const auth = useAuth();

    if (!checkPermission(Permission.Write, PermissionGroup.AccommodationRequest, auth))
        navigator(-1);
    const [previewImg, setPreviewImg] = createSignal<string>("");
    const [id] = createSignal<string>(param.id);
    const [AccommodationRequest] = createResource(id, getAccommodationRequestDetailApi);

    const [accommodationRequest, { Form, Field }] = createForm<AccommodationRequestForm>({
        validate: valiForm(AccommodationRequestSchema),
    });

    onMount(() => {
        initAccordions();
    });

    createEffect(
        on(
            () => AccommodationRequest(),
            (input) => {
                if (input) {
                    setValues(accommodationRequest, {
                        en: {
                            title: input.data.accommodation_request_translate[0].title,
                            content: input.data.accommodation_request_translate[0].content,
                        },
                        lo: {
                            title: input.data.accommodation_request_translate[1].title,
                            content: input.data.accommodation_request_translate[1].content,
                        },
                        zh_CN: {
                            title: input.data.accommodation_request_translate[2].title,
                            content: input.data.accommodation_request_translate[2].content,
                        },
                    });
                }
            }
        )
    );
    const handleSubmit: SubmitHandler<AccommodationRequestForm> = async (values) => {
        if (AccommodationRequest.state === "ready") {
            const res = await updateAccommodationRequestApi(param.id, values, {
                enId: AccommodationRequest().data.accommodation_request_translate[0].id,
                loId: AccommodationRequest().data.accommodation_request_translate[1].id,
                zhCnId: AccommodationRequest().data.accommodation_request_translate[2].id,
            });
            actionMessage.showMessage({
                level: "success",
                message: res.data.message,
            });
        }
        navigator("/accommodation-request", { resolve: false });
    };

    return (
        <Form onSubmit={handleSubmit} class="relative">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                ອັບເດດ
            </h2>
            <div id="accordion-collapse" data-accordion="collapse">
                <h2 id="accordion-collapse-heading-1">
                    <button
                        type="button"
                        class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                        data-accordion-target="#accordion-collapse-body-1"
                        aria-expanded="true"
                        aria-controls="accordion-collapse-body-1"
                    >
                        <span>ພາສາລາວ</span>
                        <svg
                            data-accordion-icon
                            class="w-3 h-3 rotate-180 shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5 5 1 1 5"
                            />
                        </svg>
                    </button>
                </h2>
                <div
                    id="accordion-collapse-body-1"
                    class="hidden"
                    aria-labelledby="accordion-collapse-heading-1"
                >
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
                            <Field name="lo.title" type="string">
                                {(field, props) => (
                                    <InputText
                                        required
                                        label="ຫົວຂໍ້ຄໍາຮ້ອງຂໍທີ່ພັກ"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="ປ້ອນຫົວຂໍ້ຄໍາຮ້ອງຂໍທີ່ພັກ"
                                    />
                                )}
                            </Field>
                            <Field name="lo.content" type="string">
                                {(field, props) => (
                                    <Textarea
                                        required
                                        label="ຂໍ້ມູນທີ່ມີເນື້ອຫາເພີ່ມເຕີມສໍາລັບການຮ້ອງຂໍທີ່ພັກ"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="ປ້ອນຂໍ້ມູນທີ່ມີເນື້ອຫາເພີ່ມເຕີມສໍາລັບການຮ້ອງຂໍທີ່ພັກ"
                                    />
                                )}
                            </Field>
                        </div>
                    </div>
                </div>
                <h2 id="accordion-collapse-heading-2">
                    <button
                        type="button"
                        class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                        data-accordion-target="#accordion-collapse-body-2"
                        aria-expanded="false"
                        aria-controls="accordion-collapse-body-2"
                    >
                        <span>ພາສາອັງກິດ</span>
                        <svg
                            data-accordion-icon
                            class="w-3 h-3 rotate-180 shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5 5 1 1 5"
                            />
                        </svg>
                    </button>
                </h2>
                <div
                    id="accordion-collapse-body-2"
                    class="hidden"
                    aria-labelledby="accordion-collapse-heading-2"
                >
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                        <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
                            <Field name="en.title" type="string">
                                {(field, props) => (
                                    <InputText
                                        required
                                        label="ຫົວຂໍ້ຄໍາຮ້ອງຂໍທີ່ພັກ"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="ປ້ອນຫົວຂໍ້ຄໍາຮ້ອງຂໍທີ່ພັກ"
                                    />
                                )}
                            </Field>
                            <Field name="en.content" type="string">
                                {(field, props) => (
                                    <Textarea
                                        required
                                        label="ຂໍ້ມູນທີ່ມີເນື້ອຫາເພີ່ມເຕີມສໍາລັບການຮ້ອງຂໍທີ່ພັກ"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="ປ້ອນຂໍ້ມູນທີ່ມີເນື້ອຫາເພີ່ມເຕີມສໍາລັບການຮ້ອງຂໍທີ່ພັກ"
                                    />
                                )}
                            </Field>
                        </div>
                    </div>
                </div>
                <h2 id="accordion-collapse-heading-3">
                    <button
                        type="button"
                        class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                        data-accordion-target="#accordion-collapse-body-3"
                        aria-expanded="false"
                        aria-controls="accordion-collapse-body-3"
                    >
                        <span>ພາສາຈີນ</span>
                        <svg
                            data-accordion-icon
                            class="w-3 h-3 rotate-180 shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5 5 1 1 5"
                            />
                        </svg>
                    </button>
                </h2>
                <div
                    id="accordion-collapse-body-3"
                    class="hidden"
                    aria-labelledby="accordion-collapse-heading-3"
                >
                    <div class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
                        <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
                            <Field name="zh_CN.title" type="string">
                                {(field, props) => (
                                    <InputText
                                        required
                                        label="ຫົວຂໍ້ຄໍາຮ້ອງຂໍທີ່ພັກ"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="ປ້ອນຫົວຂໍ້ຄໍາຮ້ອງຂໍທີ່ພັກ"
                                    />
                                )}
                            </Field>
                            <Field name="zh_CN.content" type="string">
                                {(field, props) => (
                                    <Textarea
                                        required
                                        label="ຂໍ້ມູນທີ່ມີເນື້ອຫາເພີ່ມເຕີມສໍາລັບການຮ້ອງຂໍທີ່ພັກ"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="ປ້ອນຂໍ້ມູນທີ່ມີເນື້ອຫາເພີ່ມເຕີມສໍາລັບການຮ້ອງຂໍທີ່ພັກ"
                                    />
                                )}
                            </Field>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center mt-4">
                <Button type="submit" isLoading={accommodationRequest.submitting} class="mr-3">
                    ອັບເດດ
                </Button>
                <Show
                    when={checkPermission(
                        Permission.Remove,
                        PermissionGroup.AccommodationRequest,
                        auth
                    )}
                >
                    <Button
                        color="danger"
                        outlined
                        type="button"
                        isLoading={accommodationRequest.submitting}
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

                                    navigator("/accommodation-request", { resolve: false });
                                },
                            });
                        }}
                    >
                        ລຶບ
                    </Button>
                </Show>
            </div>

            <Transition onEnter={fadeIn} onExit={fadeOut}>
                <Show when={AccommodationRequest.loading}>
                    <div
                        class={`absolute z-10 top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center`}
                    >
                        <div>
                            <LoadingIcon class="animate-spin w-8 h-8" />
                        </div>
                    </div>
                </Show>
            </Transition>
        </Form>
    );
};