import {
    FormError,
    SubmitHandler,
    createForm,
    reset,
    setValue,
    valiForm,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { Show, createEffect, createResource, createSignal, onMount } from "solid-js";
import { Transition } from "solid-transition-group";
import {
    Permission,
    PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import InputText from "../../../components/forms/input-text/InputText";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import createHetelApi from "./api/create-hetel.api";
import { HotelForm, HotelSchema } from "./schemas/hotel.schemas";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import Toggle from "../../../components/forms/toggle/Toggle";
import Map from "../../../components/map/Map";
import Textarea from "../../../components/forms/textarea/Textarea";
import { initAccordions } from "flowbite";

export default () => {
    const [, actionMessage] = useMessage();
    const navigator = useNavigate();
    const auth = useAuth();


    if (!checkPermission(Permission.Write, PermissionGroup.User, auth))
        navigator(-1);

    const [previewImg, setPreviewImg] = createSignal<string>("");

    const [hotelForm, { Form, Field }] = createForm<HotelForm>({
        validate: valiForm(HotelSchema),
    });


    const handleSubmit: SubmitHandler<HotelForm> = async (values) => {
        console.log(values);

        // const res = await createHetelApi(values);

        // actionMessage.showMessage({ level: "success", message: res.data.message });

        // navigator("hotels/list", { resolve: false });
    };
    onMount(() => {
        initAccordions();
    });

    return (
        <Form onSubmit={handleSubmit} class="relative">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                ເພີ່ມໂຮງແຮມ
            </h2>
            <Field name="image" type="File">
                {(field, props) => (
                    <ImageDropzone
                        {...props}
                        previewImage={[previewImg, setPreviewImg]}
                        onSelectFile={(file) => {
                            if (file) {
                                setValue(hotelForm, "image", file);
                            } else {
                                reset(hotelForm, "image");
                            }
                        }}
                        error={field.error}
                        helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 1440x500px)."
                    />
                )}
            </Field><br />
            <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
                <Field name="latitude">
                    {(field, props) => (
                        <InputText
                            required
                            label="ຕຳແໜ່ງເສັ້ນຂະໜານ"
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="ກະລຸນາປ້ອນຕຳແໜ່ງເສັ້ນຂະໜານ"
                        />
                    )}
                </Field>
                <Field name="longitude">
                    {(field, props) => (
                        <InputText
                            required
                            label="ຕຳແໜ່ງທາງຍາວ"
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="ກະລຸນາປ້ອນຕຳແໜ່ງທາງຍາວ"
                        />
                    )}
                </Field>
                <Field name="link">
                    {(field, props) => (
                        <InputText
                            required
                            label="ລິ້ງ"
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="ກະລຸນາໃສ່ປ້ອນລິ້ງ"
                        />
                    )}
                </Field>
                <Field name="is_published" type="boolean">
                    {(field, props) => (
                        <Toggle
                            error={field.error}
                            form={hotelForm}
                            name={props.name}
                            value={field.value}
                            label="ການມອງເຫັນ"
                        />
                    )}
                </Field>
                <Field name="phone_number">
                    {(field, props) => (
                        <InputText
                            required
                            label="ເບີໂທ"
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="ປ້ອນເບີໂທ"
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
                            <Field name="lo.name" type="string">
                                {(field, props) => (
                                    <InputText
                                        required
                                        label="ຊື"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="ປ້ອນຊື່"
                                    />
                                )}
                            </Field>
                            <Field name="lo.address" type="string">
                                {(field, props) => (
                                    <Textarea
                                        required
                                        label="ທີຢູ່"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="ປ້ອນທີຢູ່"
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
                            <Field name="en.name" type="string">
                                {(field, props) => (
                                    <InputText
                                        required
                                        label="ຊື່"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="ປ້ອນຊື່"
                                    />
                                )}
                            </Field>
                            <Field name="en.address" type="string">
                                {(field, props) => (
                                    <Textarea
                                        required
                                        label="ທີຢູ່"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="ປ້ອນທີຢູ່"
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
                            <Field name="zn_CN.name" type="string">
                                {(field, props) => (
                                    <InputText
                                        required
                                        label="ຊື່"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="ປ້ອນຊື່"
                                    />
                                )}
                            </Field>
                            <Field name="zn_CN.address" type="string">
                                {(field, props) => (
                                    <Textarea
                                        required
                                        label="ທີ່ຢູ່"
                                        {...props}
                                        value={field.value}
                                        error={field.error}
                                        placeholder="ປ້ອນທີຢູ່"
                                    />
                                )}
                            </Field>
                        </div>
                    </div>
                </div>
            </div><br />
            <Button type="submit" isLoading={hotelForm.submitting}>
                ເພີ່ມໂຮງແຮມ
            </Button>
        </Form>
    );
};
