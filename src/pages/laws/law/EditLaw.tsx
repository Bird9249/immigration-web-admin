import {
    SubmitHandler,
    createForm,
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
import deleteLaw from "./api/delete-law";
import getLawDetailApi from "./api/get-law-detail.api";
import getLawApi from "./api/get-law.api";
import { LawTableState } from "./api/law.interface";
import updateLawApi from "./api/update-law.api";
import { UpdateLawSchema, UpdateLawForm } from "./schemas/law.shema";
import InputFile from "../../../components/forms/input-file/InputFile";
export default () => {
    const [previewImg, setPreviewImg] = createSignal<string>("");
    const param = useParams();
    const [, actionConfirm] = useConfirm();
    const [, actionMessage] = useMessage();
    const navigator = useNavigate();
    const auth = useAuth();

    if (!checkPermission(Permission.Write, PermissionGroup.Law, auth))
        navigator(-1);

    const [id] = createSignal<string>(param.id);
    const [laws] = createResource(id, getLawDetailApi);
    const [lawForm, { Form, Field }] = createForm<UpdateLawForm>({
        validate: valiForm(UpdateLawSchema),
    });

    const [bannerState] = createSignal<LawTableState>({
        offset: undefined,
        limit: undefined,
    });
    const [law] = createResource(bannerState, getLawApi);

    createEffect(
        on(
            () => laws(),
            (input) => {
                if (input) {
                    setValues(lawForm, {
                        name: input.data.name,
                    });
                    setPreviewImg(
                        input.data.file
                            ? import.meta.env.VITE_IMG_URL + input.data.file
                            : ""
                    );
                }
            }
        )
    );

    const handleSubmit: SubmitHandler<UpdateLawForm> = async (values) => {

        const res = await updateLawApi(param.id, values);

        actionMessage.showMessage({ level: "success", message: res.data.message });

        navigator("/laws", { resolve: false });
    };

    return (
        <Form onSubmit={handleSubmit} class="relative">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                ອັບເດດ
            </h2>
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
            <br />
            <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
                <Field name="name">
                    {(field, props) => (
                        <InputText
                            label="ຊື່"
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="ຊື່"
                        />
                    )}
                </Field>
            </div>
            <div class="flex items-center">
                <Button type="submit" isLoading={lawForm.submitting} class="mr-3">
                    ອັບເດດປ໋ອບອັບ
                </Button>

                <Show
                    when={checkPermission(
                        Permission.Remove,
                        PermissionGroup.Law,
                        auth
                    )}
                >
                    <Button
                        color="danger"
                        outlined
                        type="button"
                        isLoading={lawForm.submitting}
                        prefixIcon={<TrashIcon />}
                        onClick={() => {
                            actionConfirm.showConfirm({
                                icon: () => (
                                    <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                                ),
                                message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                                onConfirm: async () => {
                                    const res = await deleteLaw(param.id);

                                    actionMessage.showMessage({
                                        level: "success",
                                        message: res.data.message,
                                    });

                                    navigator("/laws", { resolve: false });
                                },
                            });
                        }}
                    >
                        ລຶບ
                    </Button>
                </Show>
            </div>

            <Transition onEnter={fadeIn} onExit={fadeOut}>
                <Show when={law.loading}>
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