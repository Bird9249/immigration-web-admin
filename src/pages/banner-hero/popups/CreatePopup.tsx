import {
  SubmitHandler,
  createForm,
  reset,
  setValue,
  valiForm,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
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
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import createPopupApi from "./api/create-popup.api";
import { PopupForm, PopupSchema } from "./schemas/popup.schemas";

export default () => {
  const [previewImg, setPreviewImg] = createSignal<string>("");
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();
  const auth = useAuth();
  const [popupForm, { Form, Field }] = createForm<PopupForm>({
    validate: valiForm(PopupSchema),
  });

  if (!checkPermission(Permission.Write, PermissionGroup.Banner, auth))
    navigator(-1);

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
            previewImage={[previewImg, setPreviewImg]}
            onSelectFile={(file) => {
              if (file) {
                setValue(popupForm, "image", file);
              } else {
                reset(popupForm, "image");
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
              label="ລິ້ງ"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="Link"
            />
          )}
        </Field>
        <Field name="is_public" type="boolean">
          {(field, props) => (
            <Toggle
              error={field.error}
              form={popupForm}
              name={props.name}
              value={field.value}
              label="ການເຜີຍແຜ່"
            />
          )}
        </Field>
      </div>
      <div class=" mb-4">
        <Field name="duration" type="string[]">
          {(field) => (
            <DateRangePicker
              required
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
    </Form>
  );
};
