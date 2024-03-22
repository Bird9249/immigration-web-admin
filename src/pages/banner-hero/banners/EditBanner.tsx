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
import Accordion from "../../../components/Accordion/Accordion";
import { initAccordions } from "flowbite";
export default () => {
    const param = useParams();
    const [, actionConfirm] = useConfirm();
    const [, actionMessage] = useMessage();
    const navigator = useNavigate();
    const auth = useAuth();
    const [previewImg, setPreviewImg] = createSignal<string>("");

    const [bannerForm, { Form, Field }] = createForm<UpdateBannerForm>({
        validate: valiForm(UpdateBannerSchema),
    });

    const [bannerState] = createSignal<BannerTableState>({
        offset: undefined,
        limit: undefined,
    });
    const [banner] = createResource(bannerState, getBannerApi);
    const handleSubmit: SubmitHandler<UpdateBannerForm> = async (values) => {

        const res = await updateBannerApi(param.id, values);

        actionMessage.showMessage({ level: "success", message: res.data.message });

        navigator("/banner/list", { resolve: false });
    };
    onMount(() => {
        initAccordions()
    })

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
                            previewImg()
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
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" />
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">ປິດການມອງເຫັນ ຫຼື ບໍ</span>
                </label>
                <Field name="start_time">
                    {(field, props) => (
                        <InputText
                            required
                            label="ວັນທີເລີມ"
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="ປ້ອນວັນທີເລີມ"
                        />
                    )}
                </Field>
                <Field name="end_time">
                    {(field, props) => (
                        <InputText
                            required
                            label="ວັນທີສິນສຸດ"
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="ປ້ອນວັນທີສິນສຸດ"
                        />
                    )}
                </Field>
            </div>
            <Accordion /><br />
            <div class="flex items-center">
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
