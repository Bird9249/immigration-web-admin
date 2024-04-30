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
import deleteNewsApi from "./api/delete-news.api";
import getNewsDetailApi from "./api/get-news-detail.api";
import updateNewsApi from "./api/update-news.api";
import {
    NewsForm,
    UpdateNewsForm,
    UpdateNewsSchema,
} from "./schemas/news.schema";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
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

    if (!checkPermission(Permission.Write, PermissionGroup.NewsCategoriess, auth))
        navigator(-1);

    const [id] = createSignal<string>(param.id);
    const [news] = createResource(id, getNewsDetailApi);
    const [previewImg, setPreviewImg] = createSignal<string>("");

    const [newsForm, { Form, Field, FieldArray }] = createForm<UpdateNewsForm>({
        validate: valiForm(UpdateNewsSchema),
        initialValues: {
            translates: [
                { title: "", content: "", description: "" },
                { title: "", content: "", description: "" },
                { title: "", content: "", description: "" },
            ],
        },
    });
    createEffect(
        on(
            () => news(),
            (input) => {
                if (input) {
                    setValues(newsForm, {
                        translates: [
                            {
                                id: input.data.translates[0].id,
                                title: input.data.translates[0].title,
                                content: input.data.translates[0].content,
                                description: input.data.translates[0].description,
                            },
                            {
                                id: input.data.translates[1].id,
                                title: input.data.translates[1].title,
                                content: input.data.translates[1].content,
                                description: input.data.translates[1].description,
                            },
                            {
                                id: input.data.translates[2].id,
                                title: input.data.translates[2].title,
                                content: input.data.translates[2].content,
                                description: input.data.translates[2].description,
                            },
                        ]
                    });
                }
            }
        )
    );
    createEffect(() => {
        const errors = getErrors(newsForm);

        newsForm.internal.initialValues.translates?.map((_, idx) => {
            if (
                errors[`translates.${idx as 0 | 1 | 2}.title`] ||
                errors[`translates.${idx as 0 | 1 | 2}.description`] ||
                errors[`translates.${idx as 0 | 1 | 2}.content`]
            ) {
                setTabsItems(idx, "alert", true);
            } else {
                setTabsItems(idx, "alert", false);
            }
        });
    });

    const handleSubmit: SubmitHandler<UpdateNewsForm> = async (values) => {
        if (news.state === "ready") {
            const res = await updateNewsApi(param.id, values)

            actionMessage.showMessage({ level: "success", message: res.data.message });
        }
        navigator("/newsCategoriess/news", { resolve: false });
    };

    return (
        <Form onSubmit={handleSubmit} class="relative">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                ອັບເດດຂ່າວ
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
                                                }.title`}
                                        >
                                            {(field, props) => (
                                                <InputText
                                                    label="ຫົວຂໍ້ຂ່າວ"
                                                    required
                                                    {...props}
                                                    value={field.value}
                                                    error={field.error}
                                                    placeholder="ປ້ອນຊື່ຫົວຂໍ້ຂ່າວ"
                                                />
                                            )}
                                        </Field>
                                        <Field
                                            name={`${fieldArray.name}.${idx as unknown as 0 | 1 | 2
                                                }.content`}
                                        >
                                            {(field, props) => (
                                                <InputText
                                                    label="ເນື້ອໃນບົດຂ່າວ"
                                                    required
                                                    {...props}
                                                    value={field.value}
                                                    error={field.error}
                                                    placeholder="ປ້ອນເນື້ອໃນບົດຂ່າວ"
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
            <Field name="thumbnail" type="File">
                {(field, props) => (
                    <ImageDropzone
                        {...props}
                        previewImage={[previewImg, setPreviewImg]}
                        onSelectFile={(file) => {
                            if (file) {
                                setPreviewImg(URL.createObjectURL(file));
                                setValue(newsForm, "thumbnail", file);
                            } else {
                                reset(newsForm, "thumbnail");
                                setPreviewImg("");
                            }
                        }}
                        error={field.error}
                        helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 400x400px)."
                    />
                )}
            </Field><br />
            <div class="grid gap-4 my-4 md:grid-cols-2 md:gap-6">
                <Field name="status">
                    {(field, props) => (
                        <InputText
                            label="ສະຖານະ"
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="ປ້ອນສະຖານະ"
                        />
                    )}
                </Field>
                <Field name="public_at">
                    {(field, props) => (
                        <InputText
                            label="ສະແຕມເວລາຊີ້ບອກເວລາເຜີຍແຜ່ສາທາລະນະ"
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="ປ້ອນສະແຕມເວລາຊີ້ບອກເວລາເຜີຍແຜ່ສາທາລະນະ"
                        />
                    )}
                </Field>
            </div>
            <div class="flex items-center">
                <Button type="submit" isLoading={newsForm.submitting} class="mr-3">
                    ອັບເດດຂ່າວ
                </Button>
                <Button
                    color="danger"
                    outlined
                    type="button"
                    isLoading={newsForm.submitting}
                    prefixIcon={<TrashIcon />}
                    onClick={() => {
                        actionConfirm.showConfirm({
                            icon: () => (
                                <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                            ),
                            message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                            onConfirm: async () => {
                                const res = await deleteNewsApi(param.id);

                                actionMessage.showMessage({
                                    level: "success",
                                    message: res.data.message,
                                });

                                navigator("/newsCategoriess/news", { resolve: false });
                            },
                        });
                    }}
                >
                    ລຶບ
                </Button>
            </div>

            <Transition onEnter={fadeIn} onExit={fadeOut}>
                <Show when={news.loading}>
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