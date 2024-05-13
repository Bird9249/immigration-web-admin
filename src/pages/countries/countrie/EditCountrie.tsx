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
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import { UpdateCountriesSchema, UpdateCountriesForm } from "./schemas/countries.schema";

import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import InputText from "../../../components/forms/input-text/InputText";
import Toggle from "../../../components/forms/toggle/Toggle";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import deleteCountriesApi from "./api/delete-countries.api";
import getCountriesDetailApi from "./api/get-countries-detail.api";
import updateCountriesApi from "./api/update-countries.api";
import { createStore } from "solid-js/store";
import Textarea from "../../../components/forms/textarea/Textarea";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";

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

    if (!checkPermission(Permission.Write, PermissionGroup.Countries, auth))
        navigator(-1);

    const [previewImg, setPreviewImg] = createSignal<string>("");
    const [id] = createSignal<string>(param.id);
    const [countries] = createResource(id, getCountriesDetailApi);

    const [countriesForm, { Form, Field, FieldArray }] =
        createForm<UpdateCountriesForm>({
            validate: valiForm(UpdateCountriesSchema),
            initialValues: {
                translates: [
                    { id: 0, name: "", description: "" },
                    { id: 0, name: "", description: "" },
                    { id: 0, name: "", description: "" },
                ],
            },
        });

    createEffect(
        on(
            () => countries(),
            (input) => {
                if (input) {
                    const data: UpdateCountriesForm = {
                        is_except_visa: input.data.is_except_visa,
                        translates: [
                            {
                                id: input.data.translates[0].id,
                                name: input.data.translates[0].name,
                                description: input.data.translates[0].description,
                            },
                            {
                                id: input.data.translates[1].id,
                                name: input.data.translates[1].name,
                                description: input.data.translates[1].description,
                            },
                            {
                                id: input.data.translates[2].id,
                                name: input.data.translates[2].name,
                                description: input.data.translates[2].description,
                            },
                        ],
                    };

                    setValues(countriesForm, data);

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
        const errors = getErrors(countriesForm);

        countriesForm.internal.initialValues.translates?.map((_, idx) => {
            if (
                errors[`translates.${idx as 0 | 1 | 2}.name`] ||
                errors[`translates.${idx as 0 | 1 | 2}.description`]
            ) {
                setTabsItems(idx, "alert", true);
            } else {
                setTabsItems(idx, "alert", false);
            }
        });
    });

    const handleSubmit: SubmitHandler<UpdateCountriesForm> = async (values) => {
        console.log(values);

        // if (countries.state === "ready") {
        //     const res = await updateCountriesApi(param.id, values);
        //     actionMessage.showMessage({
        //         level: "success",
        //         message: res.data.message,
        //     });
        // }
        // navigator("countries", { resolve: false });
    };

    return (
        <Form onSubmit={handleSubmit} class="relative">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                ອັບເດດປະເທດ
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
                                                    label="ຊື່"
                                                    required
                                                    {...props}
                                                    value={field.value}
                                                    error={field.error}
                                                    placeholder="ປ້ອນຊື່"
                                                />
                                            )}
                                        </Field>
                                        <Field
                                            name={`${fieldArray.name}.${idx as unknown as 0 | 1 | 2
                                                }.description`}
                                        >
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
                                setValue(countriesForm, "image", file);
                            } else {
                                reset(countriesForm, "image");
                                setPreviewImg("");
                            }
                        }}
                        error={field.error}
                        helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 400x400px)."
                    />
                )}
            </Field>
            <br />
            <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
                <Field name="is_except_visa" type="boolean">
                    {(field, props) => (
                        <Show when={field.value !== undefined}>
                            <Toggle
                                error={field.error}
                                form={countriesForm}
                                name={props.name}
                                value={!field.value}
                                label="ຍົກເວັ້ນວິຊາ"
                            />
                        </Show>
                    )}
                </Field>
            </div>
            <div class="flex items-center mt-4">
                <Button type="submit" isLoading={countriesForm.submitting} class="mr-3">
                    ອັບເດດປ້າຍ
                </Button>
                <Show
                    when={checkPermission(
                        Permission.Remove,
                        PermissionGroup.Countries,
                        auth
                    )}
                >
                    <Button
                        color="danger"
                        outlined
                        type="button"
                        isLoading={countriesForm.submitting}
                        prefixIcon={<TrashIcon />}
                        onClick={() => {
                            actionConfirm.showConfirm({
                                icon: () => (
                                    <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                                ),
                                message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                                onConfirm: async () => {
                                    const res = await deleteCountriesApi(param.id);

                                    actionMessage.showMessage({
                                        level: "success",
                                        message: res.data.message,
                                    });

                                    navigator("countries", { resolve: false });
                                },
                            });
                        }}
                    >
                        ລຶບ
                    </Button>
                </Show>
            </div>

            <Transition onEnter={fadeIn} onExit={fadeOut}>
                <Show when={countries.loading}>
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