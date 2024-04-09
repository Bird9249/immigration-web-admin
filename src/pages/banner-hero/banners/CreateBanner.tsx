import {
  SubmitHandler,
  createForm,
  reset,
  setValue,
  valiForm,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { initAccordions } from "flowbite";
import { createSignal, onMount } from "solid-js";
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
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import createBannerApi from "./api/create-banner.api";
import { BannerForm, BannerSchema } from "./schemas/banner.schemas";

export default () => {
  const [previewImg, setPreviewImg] = createSignal<string>("");
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();
  const auth = useAuth();
  if (!checkPermission(Permission.Write, PermissionGroup.Banner, auth))
    navigator(-1);

  const [bannerForm, { Form, Field }] = createForm<BannerForm>({
    validate: valiForm(BannerSchema),
  });

  const handleSubmit: SubmitHandler<BannerForm> = async (values) => {
    const res = await createBannerApi(values);
    actionMessage.showMessage({ level: "success", message: res.data.message });
    navigator("banner/list", { resolve: false });
  };

  onMount(() => {
    initAccordions();
  });
  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ເພີ່ມຂໍ້ມູນປ້າຍໂຄສະນາ
      </h2>
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

      <div id="accordion-collapse" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-1">
          <button
            type="button"
            class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            data-accordion-target="#accordion-collapse-body-1"
            aria-expanded="true"
            aria-controls="accordion-collapse-body-1"
          >
            <span>ພາສາລາວ</span>
            <svg
              data-accordion-icon
              class="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-1"
          class="hidden"
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
              <Field name="lo.title" type="string">
                {(field, props) => (
                  <InputText
                    required
                    label="ຫົວຂໍ້"
                    {...props}
                    value={field.value}
                    error={field.error}
                    placeholder="ປ້ອນຫົວຂໍ້"
                  />
                )}
              </Field>
              <Field name="lo.description" type="string">
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
          </div>
        </div>
        <h2 id="accordion-collapse-heading-2">
          <button
            type="button"
            class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            data-accordion-target="#accordion-collapse-body-2"
            aria-expanded="false"
            aria-controls="accordion-collapse-body-2"
          >
            <span>ພາສາອັງກິດ</span>
            <svg
              data-accordion-icon
              class="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-2"
          class="hidden"
          aria-labelledby="accordion-collapse-heading-2"
        >
          <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
              <Field name="en.title" type="string">
                {(field, props) => (
                  <InputText
                    required
                    label="ຫົວຂໍ້"
                    {...props}
                    value={field.value}
                    error={field.error}
                    placeholder="ປ້ອນຫົວຂໍ້"
                  />
                )}
              </Field>
              <Field name="en.description" type="string">
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
          </div>
        </div>
        <h2 id="accordion-collapse-heading-3">
          <button
            type="button"
            class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            data-accordion-target="#accordion-collapse-body-3"
            aria-expanded="false"
            aria-controls="accordion-collapse-body-3"
          >
            <span>ພາສາຈີນ</span>
            <svg
              data-accordion-icon
              class="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-3"
          class="hidden"
          aria-labelledby="accordion-collapse-heading-3"
        >
          <div class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
            <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
              <Field name="zh_CN.title" type="string">
                {(field, props) => (
                  <InputText
                    required
                    label="ຫົວຂໍ້"
                    {...props}
                    value={field.value}
                    error={field.error}
                    placeholder="ປ້ອນຫົວຂໍ້"
                  />
                )}
              </Field>
              <Field name="zh_CN.description" type="string">
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
          </div>
        </div>
      </div>

      <div class="mt-2">
        <Button type="submit" isLoading={bannerForm.submitting}>
          ເພີ່ມຂໍ້ມູນ
        </Button>
      </div>
    </Form>
  );
};
