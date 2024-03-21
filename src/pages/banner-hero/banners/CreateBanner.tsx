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
import Accordion from "../../../components/Accordion/Accordion"
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import createBannerApi from "./api/create-banner.api";
import { BannerForm, BannerSchema } from "./schemas/banner.schemas";
import InputText from "../../../components/forms/input-text/InputText";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import { initAccordions } from "flowbite";

export default () => {
  const [previewImg, setPreviewImg] = createSignal<string>("");

  const [bannerForm, { Form, Field }] = createForm<BannerForm>({
    validate: valiForm(BannerSchema),
  });
  const handleSubmit: SubmitHandler<BannerForm> = async (values) => {
    console.log("Submit")
  };
  onMount (()=> {
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
        <Field name="start_time">
          {(field, props) => (
            <InputText
              required
              label="ວັນທີເລີມ"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="ປ້ອນວັນທີເລີມ"
            />
          )}
        </Field>
        <Field name="end_time">
          {(field, props) => (
            <InputText
              required
              label="ວັນທີສິນສຸດ"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="ປ້ອນວັນທີສິນສຸດ"
            />
          )}
        </Field>
      </div>
      <Accordion/>
      <div class="mt-2">
        <Button type="submit" isLoading={bannerForm.submitting}>
          ເພີ່ມຂໍ້ມູນ
        </Button>
      </div>
      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show>
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
