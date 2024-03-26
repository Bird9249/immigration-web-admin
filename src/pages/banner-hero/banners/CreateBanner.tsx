import {
  FormError,
  SubmitHandler,
  createForm,
  reset,
  setValue,
  valiForm,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { Show, createEffect, createResource, createSignal, onMount } from "solid-js";
import { Transition } from "solid-transition-group";
import Button from "../../../components/button/Button";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import createBannerApi from "./api/create-banner.api";
import { BannerForm, BannerSchema } from "./schemas/banner.schemas";
import getBanner from "./api/get-banner.api"
import InputText from "../../../components/forms/input-text/InputText";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import { initAccordions } from "flowbite";
import { BannerTableState } from "./api/banner.interface";
import DateRangePicker from "../../../components/forms/date-range-picker/DateRangePicker";
import Textarea from "../../../components/forms/textarea/Textarea";

export default () => {
  const [previewImg, setPreviewImg] = createSignal<string>("");
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();
  const [bannerForm, { Form, Field }] = createForm<BannerForm>({
    validate: valiForm(BannerSchema),
  });
  const [bannerState] = createSignal<BannerTableState>({
    offset: undefined,
    limit: undefined,
  });
  const [banners] = createResource(bannerState, getBanner)
  const handleSubmit: SubmitHandler<BannerForm> = async (values) => {
    // const res = await createBannerApi(values);
    console.log(values)
    // actionMessage.showMessage({ level: "success", message: res.data.message });
    // navigator("banner/list", { resolve: false });
  };
  onMount(() => {
    initAccordions()
  })
  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ເພີ່ມຂໍ້ມູນປ້າຍໂຄສະນາ
      </h2>
      <Field name="image" type="File">
        {(field, props) => (
          <ImageDropzone
            {...props}
            onSelectFile={(file) => {
              if (file) {
                setValue(bannerForm, "image", file)
              } else {
                reset(bannerForm, "image")
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
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer" />
          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">ປິດການມອງເຫັນ ຫຼື ບໍ</span>
        </label>
      </div>
      <div class=" mb-4">
        <Field name="duration" type="string[]">
          {(field) => (
            <DateRangePicker
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
          <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
            <span>LAO</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </h2>
        <div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">
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
          <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
            <span>English</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </h2>
        <div id="accordion-collapse-body-2" class="hidden" aria-labelledby="accordion-collapse-heading-2">
          <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
              <Field name="en.title" type="string">
                {(field, props) => (
                  <InputText
                    required
                    label="Title"
                    {...props}
                    value={field.value}
                    error={field.error}
                    placeholder="Title"
                  />
                )}
              </Field>
              <Field name="en.description" type="string">
                {(field, props) => (
                  <Textarea
                    required
                    label="Description"
                    {...props}
                    value={field.value}
                    error={field.error}
                    placeholder="Description"
                  />
                )}
              </Field>
            </div>
          </div>
        </div>
        <h2 id="accordion-collapse-heading-3">
          <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
            <span>Chinese</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </h2>
        <div id="accordion-collapse-body-3" class="hidden" aria-labelledby="accordion-collapse-heading-3">
          <div class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
            <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
              <Field name="zh_CN.title" type="string">
                {(field, props) => (
                  <InputText
                    required
                    label="標題"
                    {...props}
                    value={field.value}
                    error={field.error}
                    placeholder="標題"
                  />
                )}
              </Field>
              <Field name="zh_CN.description" type="string">
                {(field, props) => (
                  <Textarea
                    required
                    label="描述"
                    {...props}
                    value={field.value}
                    error={field.error}
                    placeholder="描述"
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
      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={banners.loading}>
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
