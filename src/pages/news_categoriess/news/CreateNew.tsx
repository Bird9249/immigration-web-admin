import {
    SubmitHandler,
    createForm,
    getErrors,
    reset,
    setValue,
    valiForm,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import {
    Permission,
    PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import InputText from "../../../components/forms/input-text/InputText";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import createNewsApi from "./api/create-news.api";
import { NewsForm, NewSchema } from "./schemas/news.schema";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import Textarea from "../../../components/forms/textarea/Textarea";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { createStore } from "solid-js/store";
import { NewTableState } from "./api/news.interface";
import Select from "../../../components/forms/select/Select";

export default () => {
    const [, actionMessage] = useMessage();
    const navigator = useNavigate();
    const auth = useAuth();
    const [tabsItems, setTabsItems] = createStore<TabsItems>([
        { label: "ພາສາລາວ", key: "lo" },
        { label: "ພາສາອັງກິດ", key: "en" },
        { label: "ພາສາຈີນ", key: "zh_cn" },
    ]);

    const [setState] = createSignal<NewTableState>()

    if (!checkPermission(Permission.Write, PermissionGroup.News, auth))
        navigator(-1);

    const [previewImg, setPreviewImg] = createSignal<string>("");

    const [newsForm, { Form, Field, FieldArray }] = createForm<NewsForm>({
        validate: valiForm(NewSchema),
        initialValues: {
            translates: [
                { content: "", description: "", title: "" },
                { content: "", description: "", title: "" },
                { content: "", description: "", title: "" },
            ],
        },
    });
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


    const handleSubmit: SubmitHandler<NewsForm> = async (values) => {
        const res = await createNewsApi(values);

        actionMessage.showMessage({ level: "success", message: res.data.message });

        navigator("newsCategoriess/news", { resolve: false });
    };
    return (
        <Form onSubmit={handleSubmit} class="relative">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                ເພີ່ມຂ່າວ
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
                                setValue(newsForm, "thumbnail", file);
                            } else {
                                reset(newsForm, "thumbnail");
                            }
                        }}
                        error={field.error}
                        helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 1440x500px)."
                    />
                )}
            </Field><br />
            <div class="grid gap-4 my-4 md:grid-cols-2 md:gap-6">
                <Select
                    class="w-full"
                    placeholder="ເລືອກສະຖານະ"
                    contentClass="w-44"
                    items={[
                        {
                            label: "draft",
                            value: "draft",
                        },
                        {
                            label: "published",
                            value: "published",
                        },
                        {
                            label: "private",
                            value: "private",
                        },
                    ]}
                // onValueChange={({ value }) => {
                //     setState((prev) => ({
                //         ...prev,
                //         status: value[0] === "-1" ? undefined : value[0],
                //     }));
                // }}
                ></Select>
            </div>
            <Button type="submit" isLoading={newsForm.submitting}>
                ເພີ່ມຂ່າວ
            </Button>
        </Form>
    );
};