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
import { createStore } from "solid-js/store";
import {
    Permission,
    PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import InputText from "../../../components/forms/input-text/InputText";
import Textarea from "../../../components/forms/textarea/Textarea";
import Toggle from "../../../components/forms/toggle/Toggle";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import createCountriesApi from "./api/create-countries.api";
import { CountriesSchema, CountriesForm } from "./schemas/countries.schema";

export default () => {
    const [previewImg, setPreviewImg] = createSignal<string>("");
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

    const [countrieForm, { Form, Field, FieldArray }] = createForm<CountriesForm>({
        validate: valiForm(CountriesSchema),
        initialValues: {
            translates: [
                { name: "", description: "" },
                { name: "", description: "" },
                { name: "", description: "" },
            ],
        },
    });

    createEffect(() => {
        const errors = getErrors(countrieForm);

        countrieForm.internal.initialValues.translates?.map((_, idx) => {
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

    const handleSubmit: SubmitHandler<CountriesForm> = async (values) => {
        console.log(values);

        // const res = await createCountriesApi(values);
        // actionMessage.showMessage({ level: "success", message: res.data.message });
        // navigator("countries", { resolve: false });
    };

    return (
        <Form onSubmit={handleSubmit} class="relative">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                ເພີ່ມຂໍ້ມູນປະເທດ
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
                                setValue(countrieForm, "image", file);
                            } else {
                                reset(countrieForm, "image");
                            }
                        }}
                        error={field.error}
                        helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 1440x500px)."
                    />
                )}
            </Field>

            <div class="grid gap-4 my-4 md:grid-cols-2 md:gap-6">
                <Field name="is_except_visa" type="boolean">
                    {(field, props) => (
                        <Toggle
                            error={field.error}
                            form={countrieForm}
                            name={props.name}
                            value={field.value}
                            label="ຍົກເວັ້ນວິຊາ"
                        />
                    )}
                </Field>
            </div>
            <div class="mt-2">
                <Button type="submit" isLoading={countrieForm.submitting}>
                    ເພີ່ມຂໍ້ມູນ
                </Button>
            </div>
        </Form>
    );
};