import {
    FormError,
    SubmitHandler,
    createForm,
    reset,
    setValue,
    setValues,
    valiForm,
} from "@modular-forms/solid";
import { useNavigate, useParams } from "@solidjs/router";
import { Show, createEffect, createResource, createSignal, on, onMount } from "solid-js";
import { Transition } from "solid-transition-group";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import {
    UpdateBannerSchema,
    UpdateBannerForm,
    BannerForm
} from "./schemas/banner.schemas";
import Button from "../../../components/button/Button";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import { BannerTableState } from "./api/banner.interface";
import getBannerApi from "./api/get-banner.api";
import updateBannerApi from "./api/update-banner.api";
import deleteBannerApi from "./api/delete-banner.api";
import InputText from "../../../components/forms/input-text/InputText";
import getBannerDetailApi from "./api/get-banner-detail.api";
import { initAccordions } from "flowbite";
import Toggle from "../../../components/forms/toggle/Toggle";
import DateRangePicker from "../../../components/forms/date-range-picker/DateRangePicker";
import Textarea from "../../../components/forms/textarea/Textarea";
import { format } from "date-fns";
import { BannerTranslateFormInput } from "./schemas/banner-translate.schemas";
export default () => {
    const param = useParams();
    const [, actionConfirm] = useConfirm();
    const [, actionMessage] = useMessage();
    const navigator = useNavigate();
    const [previewImg, setPreviewImg] = createSignal<string>("");
    const [id] = createSignal<string>(param.id)
    const [banners] = createResource(id, getBannerDetailApi)

    const [bannerForm, { Form, Field }] = createForm<UpdateBannerForm>({
        validate: valiForm(UpdateBannerSchema),
    });

    const [bannerState] = createSignal<BannerTableState>({
        offset: undefined,
        limit: undefined,
    });
    onMount(() => {
        initAccordions()
    })
    const [banner] = createResource(bannerState, getBannerApi);


    createEffect(
        on(
            () => banners(),
            (input) => {
                if (input) {
                    const en: BannerTranslateFormInput = { title: "", description: "" }
                    const lo: BannerTranslateFormInput = { title: "", description: "" }
                    const zh_CN: BannerTranslateFormInput = { title: "", description: "" }

                    input.data.translates.forEach((val) => {
                        switch (val.lang) {
                            case 'lo':
                                lo.title = val.title ?? ""
                                lo.description = val.description
                                break;
                            case 'en':
                                en.title = val.title ?? ""
                                en.description = val.description
                                break;
                            case 'zh_cn':
                                zh_CN.title = val.title ?? ""
                                zh_CN.description = val.description
                                break;

                            default:
                                break;
                        }
                    })

                    setValues(bannerForm, {
                        link: input.data.link,
                        is_private: input.data.is_private,
                        duration: [format(input.data.start_time, 'yyyy-MM-dd'), format(input.data.end_time, 'yyyy-MM-dd')],
                        en, lo, zh_CN
                    });
                    setPreviewImg(
                        input.data.image
                            ? import.meta.env.VITE_IMG_URL + input.data.image
                            : ""
                    );
                }
            }
        )
    );
    const handleSubmit: SubmitHandler<UpdateBannerForm> = async (values) => {

        const res = await updateBannerApi(param.id, values);

        actionMessage.showMessage({ level: "success", message: res.data.message });

        navigator("/banner/list", { resolve: false });
    };


    return (
        <Form onSubmit={handleSubmit} class="relative">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                ອັບເດດປ້າຍ
            </h2>
            <Field name="image" type="File">
                {(field, props) => (
                    <ImageDropzone
                        {...props}
                        previewImage={
                            [previewImg, setPreviewImg]
                        }
                        onSelectFile={(file) => {
                            if (file) {
                                setPreviewImg(URL.createObjectURL(file));
                                setValue(bannerForm, "image", file)
                            } else {
                                reset(bannerForm, "image")
                                setPreviewImg("");
                            }
                        }}
                        error={field.error}
                        helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 400x400px)."
                    />
                )}
            </Field><br />
            <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
                <Field name="link">
                    {(field, props) => (
                        <InputText
                            required
                            label="ລິ້ງ"
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="Link"
                        />
                    )}
                </Field>
                <Field name="is_private" type="boolean">
                    {(field, props) => (
                        <Show when={field.value !== undefined}>
                            <Toggle
                                error={field.error}
                                form={bannerForm}
                                name={props.name}
                                value={field.value}
                                label="ການມອງເຫັນ"
                            />
                        </Show>
                    )}
                </Field>

            </div>
            <div class=" mb-4">
                <Field name="duration" type="string[]">
                    {(field) => (
                        <DateRangePicker
                            error={field.error}
                            label={["ເວລາເລີມຕົ້ນ", "ເວລາສິນສຸດ"]}
                            placeholder={["ເວລາເລີມຕົ້ນ", "ເວລາສິນສຸດ"]}
                            name={field.name}
                            form={bannerForm}
                            value={field.value}
                            formClass="grid md:grid-cols-2 gap-4"
                        />
                    )}
                </Field>
            </div>
            <div id="accordion-collapse" data-accordion="collapse">
                <h2 id="accordion-collapse-heading-1">
                    <button
                        type="button"
                        class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                        data-accordion-target="#accordion-collapse-body-1"
                        aria-expanded="true"
                        aria-controls="accordion-collapse-body-1"
                    >
                        <span>LAO</span>
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
                                        label="ຫົວຂໍ້"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="ປ້ອນຫົວຂໍ້"
                                    />
                                )}
                            </Field>
                            <Field name="lo.description" type="string">
                                {(field, props) => (
                                    <Textarea
                                        required
                                        label="ຄຳອະທິບາຍ"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="ປ້ອນຄຳອະທິບາຍ"
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
                        <span>English</span>
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
                                        label="Title"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="Title"
                                    />
                                )}
                            </Field>
                            <Field name="en.description" type="string">
                                {(field, props) => (
                                    <Textarea
                                        required
                                        label="Description"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="Description"
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
                        <span>Chinese</span>
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
                                        label="標題"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="標題"
                                    />
                                )}
                            </Field>
                            <Field name="zh_CN.description" type="string">
                                {(field, props) => (
                                    <Textarea
                                        required
                                        label="描述"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="描述"
                                    />
                                )}
                            </Field>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center mt-4">
                <Button type="submit" isLoading={bannerForm.submitting} class="mr-3">
                    ອັບເດດປ້າຍ
                </Button>
                <Button
                    color="danger"
                    outlined
                    type="button"
                    isLoading={bannerForm.submitting}
                    prefixIcon={<TrashIcon />}
                    onClick={() => {
                        actionConfirm.showConfirm({
                            icon: () => (
                                <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                            ),
                            message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                            onConfirm: async () => {
                                const res = await deleteBannerApi(param.id);

                                actionMessage.showMessage({
                                    level: "success",
                                    message: res.data.message,
                                });

                                navigator("/banner/list", { resolve: false });
                            },
                        });
                    }}
                >
                    ລຶບ
                </Button>
            </div>

            <Transition onEnter={fadeIn} onExit={fadeOut}>
                <Show when={banner.loading}>
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
