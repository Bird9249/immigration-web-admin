import {
    SubmitHandler,
    createForm,
    getErrors,
    reset,
    setValue,
    valiForm,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
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
import Editor from "../../../components/forms/editor/Editor";
import getNewsCategoriesApi from "../news_categories/api/get-news-categories.api";

export default () => {
    const [, actionMessage] = useMessage();
    const navigator = useNavigate();
    const auth = useAuth();
    const [tabsItems, setTabsItems] = createStore<TabsItems>([
        { label: "ພາສາລາວ", key: "lo" },
        { label: "ພາສາອັງກິດ", key: "en" },
        { label: "ພາສາຈີນ", key: "zh_cn" },
    ]);


    if (!checkPermission(Permission.Write, PermissionGroup.News, auth))
        navigator(-1);
    const [newsState] = createSignal<NewTableState>({
        offset: undefined,
        limit: undefined,
    });
    const [previewImg, setPreviewImg] = createSignal<string>("");
    const [news] = createResource(newsState, getNewsCategoriesApi);
    const [newsOptions, setnewsOptions] = createSignal<
        { label: string; value: string }[]
    >([]);

    const [newsForm, { Form, Field, FieldArray }] = createForm<NewsForm>({
        validate: valiForm(NewSchema),
        initialValues: {
            category_id: [],
            status: [],
            translates: [
                {
                    title: "",
                    description: "",
                    content: JSON.stringify({
                        type: "doc",
                        content: [],
                    }),
                },
                {
                    title: "",
                    description: "",
                    content: JSON.stringify({
                        type: "doc",
                        content: [],
                    }),
                },
                {
                    title: "",
                    description: "",
                    content: JSON.stringify({
                        type: "doc",
                        content: [],
                    }),
                },
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
        if (news.state === "ready") {
            setnewsOptions(
                news().data.data.map((val) => ({
                    label: val.translates[0].name,
                    value: String(val.id)
                }))
            )
        }
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
                <Field name="category_id" type="string[]">
                    {(field, props) => (
                        <Select
                            placeholder="ເລືອກຂ່າວສານ"
                            contentClass="w-44"
                            onValueChange={({ value }) => {
                                setValue(newsForm, "category_id", value);
                            }}
                            label="ເລືອກຂ່າວ"
                            name={props.name}
                            items={newsOptions()}
                            error={field.error}
                            value={field.value}
                        ></Select>
                    )}
                </Field>
                <Field name="status" type="string[]">
                    {(field, props) => (
                        <Select
                            placeholder="ເລືອກສະຖານະ"
                            contentClass="w-44"
                            onValueChange={({ value }) => {
                                setValue(newsForm, "status", value);
                            }}
                            label="ສະຖານະ"
                            name={props.name}
                            items={[
                                {
                                    label: "ແບບຮ່າງ",
                                    value: "draft",
                                },
                                {
                                    label: "ເຜີຍແຜ່",
                                    value: "published",
                                },
                                {
                                    label: "ສ່ວນໂຕ",
                                    value: "private",
                                },
                            ]}
                            error={field.error}
                            value={field.value}
                        ></Select>
                    )}
                </Field>
            </div>
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
                                        <Field
                                            name={`${fieldArray.name}.${idx as unknown as 0 | 1 | 2
                                                }.content`}
                                        >
                                            {(field) => (
                                                <Editor
                                                    label="ເນື້ອຫາ"
                                                    required
                                                    value={field.value}
                                                    error={field.error}
                                                    onInput={(val) => {
                                                        setValue(
                                                            newsForm,
                                                            `${fieldArray.name}.${idx as unknown as 0 | 1 | 2
                                                            }.${"content"}`,
                                                            val
                                                        );
                                                    }}
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

            <Button type="submit" isLoading={newsForm.submitting}>
                ເພີ່ມຂ່າວ
            </Button>
        </Form>
    );
};