import {
  SubmitHandler,
  createForm,
  reset,
  setValue,
  setValues,
  valiForm,
} from "@modular-forms/solid";
import { useNavigate, useParams } from "@solidjs/router";
import { format } from "date-fns";
import { Show, createEffect, createResource, createSignal, on } from "solid-js";
import { Transition } from "solid-transition-group";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import DateRangePicker from "../../../components/forms/date-range-picker/DateRangePicker";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import InputText from "../../../components/forms/input-text/InputText";
import Toggle from "../../../components/forms/toggle/Toggle";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import deletePopupApi from "./api/delete-popup.api";
import getPopupDetailApi from "./api/get-popup-detail.api";
import getPopupApi from "./api/get-popup.api";
import { PopupTableState } from "./api/popup.interface";
import updatePopupApi from "./api/update-popup.api";
import { UpdatePopupForm, UpdatePopupSchema } from "./schemas/popup.schemas";
export default () => {
  const [previewImg, setPreviewImg] = createSignal<string>("");
  const param = useParams();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();
  const auth = useAuth();

  if (!checkPermission(Permission.Write, PermissionGroup.Banner, auth))
    navigator(-1);

  const [id] = createSignal<string>(param.id);
  const [popups] = createResource(id, getPopupDetailApi);
  const [popupForm, { Form, Field }] = createForm<UpdatePopupForm>({
    validate: valiForm(UpdatePopupSchema),
  });

  const [bannerState] = createSignal<PopupTableState>({
    offset: undefined,
    limit: undefined,
  });
  const [popup] = createResource(bannerState, getPopupApi);

  createEffect(
    on(
      () => popups(),
      (input) => {
        if (input) {
          setValues(popupForm, {
            link: input.data.link,
            is_private: input.data.is_private,
            duration: [
              format(input.data.start_time, "yyyy-MM-dd"),
              format(input.data.end_time, "yyyy-MM-dd"),
            ],
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

  const handleSubmit: SubmitHandler<UpdatePopupForm> = async (values) => {
    const res = await updatePopupApi(param.id, values);

    actionMessage.showMessage({ level: "success", message: res.data.message });

    navigator("/banner/popup", { resolve: false });
  };

  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ອັບເດດປ໋ອບອັບ
      </h2>
      <Field name="image" type="File">
        {(field, props) => (
          <ImageDropzone
            {...props}
            previewImage={[previewImg, setPreviewImg]}
            onSelectFile={(file) => {
              if (file) {
                setPreviewImg(URL.createObjectURL(file));
                setValue(popupForm, "image", file);
              } else {
                reset(popupForm, "image");
                setPreviewImg("");
              }
            }}
            error={field.error}
            helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 800x800px)."
          />
        )}
      </Field>
      <br />
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
        <Field name="is_private" type="boolean">
          {(field, props) => (
            <>
              <Show when={field.value !== undefined}>
                <Toggle
                  error={field.error}
                  form={popupForm}
                  name={props.name}
                  value={field.value}
                  label="ການມອງເຫັນ"
                />
              </Show>
            </>
          )}
        </Field>
      </div>
      <div class=" mb-4">
        <Field name="duration" type="string[]">
          {(field) => (
            <DateRangePicker
              error={field.error}
              label={["ເວລາເລີມຕົ້ນ", "ເວລາສິນສຸດ"]}
              placeholder={["ເວລາເລີມຕົ້ນ", "ເວລາສິນສຸດ"]}
              name={field.name}
              form={popupForm}
              value={field.value}
              formClass="grid md:grid-cols-2 gap-4"
            />
          )}
        </Field>
      </div>
      <div class="flex items-center">
        <Button type="submit" isLoading={popupForm.submitting} class="mr-3">
          ອັບເດດປ໋ອບອັບ
        </Button>

        <Show
          when={checkPermission(
            Permission.Remove,
            PermissionGroup.Banner,
            auth
          )}
        >
          <Button
            color="danger"
            outlined
            type="button"
            isLoading={popupForm.submitting}
            prefixIcon={<TrashIcon />}
            onClick={() => {
              actionConfirm.showConfirm({
                icon: () => (
                  <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                ),
                message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                onConfirm: async () => {
                  const res = await deletePopupApi(param.id);

                  actionMessage.showMessage({
                    level: "success",
                    message: res.data.message,
                  });

                  navigator("/banner/popup", { resolve: false });
                },
              });
            }}
          >
            ລຶບ
          </Button>
        </Show>
      </div>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={popup.loading}>
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
