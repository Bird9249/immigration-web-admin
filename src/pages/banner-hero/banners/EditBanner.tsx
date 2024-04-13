import {
  SubmitHandler,
  createForm,
  getErrors,
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
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import { UpdateBannerForm, UpdateBannerSchema } from "./schemas/banner.schemas";

import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import DateRangePicker from "../../../components/forms/date-range-picker/DateRangePicker";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import InputText from "../../../components/forms/input-text/InputText";
import Toggle from "../../../components/forms/toggle/Toggle";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import deleteBannerApi from "./api/delete-banner.api";
import getBannerDetailApi from "./api/get-banner-detail.api";
import updateBannerApi from "./api/update-banner.api";

import { format } from "date-fns";
import { createStore } from "solid-js/store";
import Textarea from "../../../components/forms/textarea/Textarea";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";

export default () => {
  const param = useParams();
  const [, actionConfirm] = useConfirm();
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

  const [previewImg, setPreviewImg] = createSignal<string>("");
  const [id] = createSignal<string>(param.id);
  const [banner] = createResource(id, getBannerDetailApi);

  const [bannerForm, { Form, Field, FieldArray }] =
    createForm<UpdateBannerForm>({
      validate: valiForm(UpdateBannerSchema),
      initialValues: {
        translates: [
          { id: 0, title: "", description: "" },
          { id: 0, title: "", description: "" },
          { id: 0, title: "", description: "" },
        ],
      },
    });

  createEffect(
    on(
      () => banner(),
      (input) => {
        if (input) {
          const data: UpdateBannerForm = {
            link: input.data.link,
            is_private: input.data.is_private,
            duration: [
              format(input.data.start_time, "yyyy-MM-dd"),
              format(input.data.end_time, "yyyy-MM-dd"),
            ],
            translates: [
              {
                id: input.data.translates[0].id,
                title: input.data.translates[0].title,
                description: input.data.translates[0].description,
              },
              {
                id: input.data.translates[1].id,
                title: input.data.translates[1].title,
                description: input.data.translates[1].description,
              },
              {
                id: input.data.translates[2].id,
                title: input.data.translates[2].title,
                description: input.data.translates[2].description,
              },
            ],
          };

          setValues(bannerForm, data);

          setPreviewImg(
            input.data.image
              ? import.meta.env.VITE_IMG_URL + input.data.image
              : ""
          );
        }
      }
    )
  );

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

  const handleSubmit: SubmitHandler<UpdateBannerForm> = async (values) => {
    if (banner.state === "ready") {
      const res = await updateBannerApi(param.id, values);
      actionMessage.showMessage({
        level: "success",
        message: res.data.message,
      });
    }
    navigator("/banner/list", { resolve: false });
  };

  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ອັບເດດປ້າຍ
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
                      }.id`}
                      type="number"
                    >
                      {() => <></>}
                    </Field>
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
                setPreviewImg(URL.createObjectURL(file));
                setValue(bannerForm, "image", file);
              } else {
                reset(bannerForm, "image");
                setPreviewImg("");
              }
            }}
            error={field.error}
            helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 400x400px)."
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
            <Show when={field.value !== undefined}>
              <Toggle
                error={field.error}
                form={bannerForm}
                name={props.name}
                value={!field.value}
                label="ການມອງເຫັນ"
              />
            </Show>
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

      <div class="flex items-center mt-4">
        <Button type="submit" isLoading={bannerForm.submitting} class="mr-3">
          ອັບເດດປ້າຍ
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
            isLoading={bannerForm.submitting}
            prefixIcon={<TrashIcon />}
            onClick={() => {
              actionConfirm.showConfirm({
                icon: () => (
                  <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                ),
                message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                onConfirm: async () => {
                  const res = await deleteBannerApi(param.id);

                  actionMessage.showMessage({
                    level: "success",
                    message: res.data.message,
                  });

                  navigator("/banner/list", { resolve: false });
                },
              });
            }}
          >
            ລຶບ
          </Button>
        </Show>
      </div>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={banner.loading}>
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
