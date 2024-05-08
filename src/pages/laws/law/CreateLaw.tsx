import {
    SubmitHandler,
    createForm,
    reset,
    setValue,
    valiForm,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { Show, createResource, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";
import {
    Permission,
    PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import InputFile from "../../../components/forms/input-file/InputFile";
import InputText from "../../../components/forms/input-text/InputText";

import LoadingIcon from "../../../components/icons/LoadingIcon";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import { LawResponse, LawTableState } from "./api/law.interface";
import createLawApi from "./api/create-law.api";
import { LawForm, LawSchema } from "./schemas/law.shema";

export default () => {
    const [, actionMessage] = useMessage();
    const navigator = useNavigate();
    const auth = useAuth();

    if (!checkPermission(Permission.Write, PermissionGroup.Law, auth))
        navigator(-1);

    const [previewImg, setPreviewImg] = createSignal<string>("");

    const [lawForm, { Form, Field }] = createForm<LawForm>({
        validate: valiForm(LawSchema),
    });

    const [lawState] = createSignal<LawTableState>({
        offset: undefined,
        limit: undefined,
    });
    const [laws] = createResource(lawState);


    const handleSubmit: SubmitHandler<LawForm> = async (values) => {
        const res = await createLawApi(values);

        actionMessage.showMessage({ level: "success", message: res.data.message });

        navigator("laws", { resolve: false });
    };

    return (
        <Form onSubmit={handleSubmit} class="relative">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                ເພີ່ມຂໍ້ມູນ
            </h2>
            <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
                <Field name="file" type="File">
                    {(field, props) => (
                        <InputFile
                            label="ອັບໂຫລດໄຟລ໌"
                            {...props}
                            error={field.error}
                            helpMessage="Upload file pdf"
                            onSelectFile={(files) => {
                                if (files.length <= 0) {
                                    setPreviewImg("");
                                    reset(lawForm, "file");
                                } else {
                                    setPreviewImg(URL.createObjectURL(files[0]));
                                    setValue(lawForm, "file", files[0]);
                                }
                            }}
                        />
                    )}
                </Field>

                <Field name="name">
                    {(field, props) => (
                        <InputText
                            required
                            label="ຊື່"
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="ຊື່"
                        />
                    )}
                </Field>
            </div>

            <Button type="submit" isLoading={lawForm.submitting}>
                ເພີ່ມຂໍ້ມູນ
            </Button>

            <Transition onEnter={fadeIn} onExit={fadeOut}>
                <Show when={laws.loading}>
                    <div
                        class={`absolute z-10 top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center rounded-lg`}
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
