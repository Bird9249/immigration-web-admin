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
import Button from "../../../components/button/Button";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import createPopupApi from "./api/create-popup.api";
import { PopupForm, PopupSchema } from "./schemas/popup.schemas";
import getPopupApi from "./api/get-popup.api";
import InputText from "../../../components/forms/input-text/InputText";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import { PopupTableState } from "./api/popup.interface";
import Toggle from "../../../components/forms/toggle/Toggle";
import DateRangePicker from "../../../components/forms/date-range-picker/DateRangePicker";

export default () => {
  const [previewImg, setPreviewImg] = createSignal<string>("");
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();
  const [popupForm, { Form, Field }] = createForm<PopupForm>({
    validate: valiForm(PopupSchema),
  });

  const [popupState] = createSignal<PopupTableState>({
    offset: undefined,
    limit: undefined,
  });
  const [popups] = createResource(popupState, getPopupApi);
  const handleSubmit: SubmitHandler<PopupForm> = async (values) => {
    const res = await createPopupApi(values);
    actionMessage.showMessage({ level: "success", message: res.data.message });
    navigator("banner/popup", { resolve: false });
  };
  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ເພີ່ມຂໍ້ມູນປ໋ອບອັບ
      </h2>
      <Field name="image" type="File">
        {(field, props) => (
          <ImageDropzone
            {...props}
            previewImage={
              [previewImg, setPreviewImg]
            }
            onSelectFile={(file) => {
              if (file) {
                setValue(popupForm, "image", file)
              } else {
                reset(popupForm, "image")
              }
            }}
            error={field.error}
            helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 400x400px)."
          />
        )}
      </Field><br />
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
            <Toggle
              error={field.error}
              form={popupForm}
              name={props.name}
              value={field.value}
              label="ການມອງເຫັນ"
            />
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
      <div class="mt-2">
        <Button type="submit" isLoading={popupForm.submitting}>
          ເພີ່ມຂໍ້ມູນ
        </Button>
      </div>
      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={popups.loading}>
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
