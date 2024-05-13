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
import DateRangePicker from "../../../components/forms/date-range-picker/DateRangePicker";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import InputText from "../../../components/forms/input-text/InputText";
import Textarea from "../../../components/forms/textarea/Textarea";
import Toggle from "../../../components/forms/toggle/Toggle";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import createBannerApi from "./api/create-banner.api";
import { BannerForm, BannerSchema } from "./schemas/banner.schemas";

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

  if (!checkPermission(Permission.Write, PermissionGroup.Banner, auth))
    navigator(-1);

  const [bannerForm, { Form, Field, FieldArray }] = createForm<BannerForm>({
    validate: valiForm(BannerSchema),
    initialValues: {
      translates: [
        { title: "", description: "" },
        { title: "", description: "" },
        { title: "", description: "" },
      ],
    },
  });

  createEffect(() => {
    const errors = getErrors(bannerForm);

    bannerForm.internal.initialValues.translates?.map((_, idx) => {
      if (
        errors[`translates.${idx as 0 | 1 | 2}.title`] ||
        errors[`translates.${idx as 0 | 1 | 2}.description`]
      ) {
        setTabsItems(idx, "alert", true);
      } else {
        setTabsItems(idx, "alert", false);
      }
    });
  });

  const handleSubmit: SubmitHandler<BannerForm> = async (values) => {
    const res = await createBannerApi(values);
    actionMessage.showMessage({ level: "success", message: res.data.message });
    navigator("banner/list", { resolve: false });
  };

  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ເພີ່ມຂໍ້ມູນປ້າຍໂຄສະນາ
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
                      name={`${fieldArray.name}.${
                        idx as unknown as 0 | 1 | 2
                      }.title`}
                    >
                      {(field, props) => (
                        <InputText
                          label="ຫົວຂໍ້"
                          required
                          {...props}
                          value={field.value}
                          error={field.error}
                          placeholder="ປ້ອນຫົວຂໍ້"
                        />
                      )}
                    </Field>
                    <Field
                      name={`${fieldArray.name}.${
                        idx as unknown as 0 | 1 | 2
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
                setValue(bannerForm, "image", file);
              } else {
                reset(bannerForm, "image");
              }
            }}
            error={field.error}
            helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 1440x500px)."
          />
        )}
      </Field>

      <div class="grid gap-4 my-4 md:grid-cols-2 md:gap-6">
        <Field name="link">
          {(field, props) => (
            <InputText
              label="ລິ້ງ"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="ປ້ອນລິ້ງ"
            />
          )}
        </Field>
        <Field name="is_private" type="boolean">
          {(field, props) => (
            <Toggle
              error={field.error}
              form={bannerForm}
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
              required
              error={field.error}
              label={["ເວລາເລີມຕົ້ນ", "ເວລາສິນສຸດ"]}
              placeholder={["ເວລາເລີມຕົ້ນ", "ເວລາສິນສຸດ"]}
              name={field.name}
              form={bannerForm}
              value={field.value}
              formClass="grid md:grid-cols-2 gap-4"
            />
          )}
        </Field>
      </div>

      <div class="mt-2">
        <Button type="submit" isLoading={bannerForm.submitting}>
          ເພີ່ມຂໍ້ມູນ
        </Button>
      </div>
    </Form>
  );
};
