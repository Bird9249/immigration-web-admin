import {
    SubmitHandler,
    createForm,
    getErrors,
    reset,
    setValue,
    setValues,
    valiForm,
} from "@modular-forms/solid";
import { useNavigate, useParams } from "@solidjs/router";
import { Show, createEffect, createResource, createSignal, on } from "solid-js";
import { Transition } from "solid-transition-group";
import {
    Permission,
    PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import InputText from "../../../components/forms/input-text/InputText";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import deleteHotelApi from "./api/delete-hotel.api";
import getHotelDetailApi from "./api/get-hotel-detail.api";
import updateHotelApi from "./api/update-hotel.api";
import {
    UpdateHotelForm,
    UpdateHotelSchema,
} from "./schemas/hotel.schemas";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import Toggle from "../../../components/forms/toggle/Toggle";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { createStore } from "solid-js/store";
import Textarea from "../../../components/forms/textarea/Textarea";

export default () => {
    const param = useParams();
    const [, actionConfirm] = useConfirm();
    const [, actionMessage] = useMessage();
    const navigator = useNavigate();
    const auth = useAuth();
    const [tabsItems, setTabsItems] = createStore<TabsItems>([
        { label: "ພາສາລາວ", key: "lo" },
        { label: "ພາສາອັງກິດ", key: "en" },
        { label: "ພາສາຈີນ", key: "zh_cn" },
    ]);

    if (!checkPermission(Permission.Write, PermissionGroup.Hotel, auth))
        navigator(-1);

    const [id] = createSignal<string>(param.id);
    const [hotel] = createResource(id, getHotelDetailApi);
    const [previewImg, setPreviewImg] = createSignal<string>("");

    const [hotelForm, { Form, Field, FieldArray }] = createForm<UpdateHotelForm>({
        validate: valiForm(UpdateHotelSchema),
        initialValues: {
            translates: [
                { id: 0, name: "", address: "" },
                { id: 0, name: "", address: "" },
                { id: 0, name: "", address: "" },
            ],
        },
    });
    createEffect(
        on(
            () => hotel(),
            (input) => {
                if (input) {
                    setValues(hotelForm, {
                        link: input.data.link,
                        map_link: input.data.link_map,
                        phone_number: input.data.phone_number,
                        is_published: input.data.is_published,
                        translates: [
                            {
                                id: input.data.translates[0].id,
                                name: input.data.translates[0].name,
                                address: input.data.translates[0].address,
                            },
                            {
                                id: input.data.translates[1].id,
                                name: input.data.translates[1].name,
                                address: input.data.translates[1].address,
                            },
                            {
                                id: input.data.translates[2].id,
                                name: input.data.translates[2].name,
                                address: input.data.translates[2].address,
                            },
                        ]
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
    createEffect(() => {
        const errors = getErrors(hotelForm);

        hotelForm.internal.initialValues.translates?.map((_, idx) => {
            if (
                errors[`translates.${idx as 0 | 1 | 2}.name`] ||
                errors[`translates.${idx as 0 | 1 | 2}.address`]
            ) {
                setTabsItems(idx, "alert", true);
            } else {
                setTabsItems(idx, "alert", false);
            }
        });
    });

    const handleSubmit: SubmitHandler<UpdateHotelForm> = async (values) => {
        if (hotel.state === "ready") {
            const res = await updateHotelApi(param.id, values)

            actionMessage.showMessage({ level: "success", message: res.data.message });
        }
        navigator("/hotels", { resolve: false });
    };

    return (
        <Form onSubmit={handleSubmit} class="relative">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                ອັບເດດໂຮງແຮມ
            </h2>
            <FieldArray name="translates">
                {(fieldArray) => (
                    <Tabs
                        items={tabsItems}
                        contents={[{ key: "lo" }, { key: "en" }, { key: "zh_cn" }].map(
                            (val, idx) => ({
                                ...val,
                                content: (
                                    <div class="my-4 flex flex-col gap-4">
                                        <Field
                                            name={`${fieldArray.name}.${idx as unknown as 0 | 1 | 2
                                                }.id`}
                                            type="number"
                                        >
                                            {() => <></>}
                                        </Field>
                                        <Field
                                            name={`${fieldArray.name}.${idx as unknown as 0 | 1 | 2
                                                }.name`}
                                        >
                                            {(field, props) => (
                                                <InputText
                                                    label="ຊື່ຂອງໂຮງແຮມ"
                                                    required
                                                    {...props}
                                                    value={field.value}
                                                    error={field.error}
                                                    placeholder="ປ້ອນຊື່ຂອງໂຮງແຮມ"
                                                />
                                            )}
                                        </Field>
                                        <Field
                                            name={`${fieldArray.name}.${idx as unknown as 0 | 1 | 2
                                                }.address`}
                                        >
                                            {(field, props) => (
                                                <Textarea
                                                    required
                                                    label="ທີ່ຢູ່ຂອງໂຮງແຮມ"
                                                    {...props}
                                                    value={field.value}
                                                    error={field.error}
                                                    placeholder="ປ້ອນທີ່ຢູ່ຂອງໂຮງແຮມ"
                                                />
                                            )}
                                        </Field>
                                    </div>
                                ),
                            })
                        )}
                    />
                )}
            </FieldArray>
            <Field name="image" type="File">
                {(field, props) => (
                    <ImageDropzone
                        {...props}
                        previewImage={[previewImg, setPreviewImg]}
                        onSelectFile={(file) => {
                            if (file) {
                                setPreviewImg(URL.createObjectURL(file));
                                setValue(hotelForm, "image", file);
                            } else {
                                reset(hotelForm, "image");
                                setPreviewImg("");
                            }
                        }}
                        error={field.error}
                        helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 400x400px)."
                    />
                )}
            </Field>
            <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
                <Field name="link">
                    {(field, props) => (
                        <InputText
                            required
                            label="ລິ້ງໂຮງແຮມ"
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="Link"
                        />
                    )}
                </Field>
                <Field name="is_published" type="boolean">
                    {(field, props) => (
                        <Show when={field.value !== undefined}>
                            <Toggle
                                error={field.error}
                                form={hotelForm}
                                name={props.name}
                                value={field.value}
                                label="ການມອງເຫັນ"
                            />
                        </Show>
                    )}
                </Field>
                <Field name="map_link">
                    {(field, props) => (
                        <InputText
                            required
                            label="ລິ້ງແຜນທີໂຮງແຮມ"
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="Link"
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
                            placeholder="ກະລຸນາປ້ອນເບີໂທ"
                        />
                    )}
                </Field>


            </div>

            <div class="flex items-center">
                <Button type="submit" isLoading={hotelForm.submitting} class="mr-3">
                    ອັບເດດໂຮງແຮມ
                </Button>
                <Button
                    color="danger"
                    outlined
                    type="button"
                    isLoading={hotelForm.submitting}
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

                                navigator("/hotels/list", { resolve: false });
                            },
                        });
                    }}
                >
                    ລຶບ
                </Button>
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
        </Form>
    );
};
