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
import { createStore } from "solid-js/store";
import { Transition } from "solid-transition-group";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Alert from "../../../components/alert/Alert";
import Button from "../../../components/button/Button";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import InputText from "../../../components/forms/input-text/InputText";
import PasswordInput from "../../../components/forms/password-input/PasswordInput";
import Toggle from "../../../components/forms/toggle/Toggle";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useAxios } from "../../../contexts/axios/AxiosContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import deleteHotelApi from "./api/delete-hotel.api";
import getHotelDetailApi from "./api/get-hotel-detail.api";
import updateHotelApi from "./api/update-hotel.api";
import { UpdateHotelForm, UpdateHotelSchema } from "./schemas/hotel.schemas";

export default () => {
  const param = useParams();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();
  const {
    error: [error, setError],
  } = useAxios();
  const auth = useAuth();
  const [tabsItems, setTabsItems] = createStore<TabsItems>([
    { label: "ພາສາລາວ", key: "lo" },
    { label: "ພາສາອັງກິດ", key: "en" },
    { label: "ພາສາຈີນ", key: "zh_cn" },
  ]);

  if (!checkPermission(Permission.Write, PermissionGroup.Hotel, auth))
    navigator(-1);

  const [id] = createSignal<string>(param.id);
  const [hotel] = createResource(id, getHotelDetailApi);
  const [previewImg, setPreviewImg] = createSignal<string>("");
  const [haveAdmin, setHaveAdmin] = createSignal<boolean | undefined>(
    undefined
  );

  createEffect(
    on(haveAdmin, (input) => {
      if (input) {
        setValue(hotelForm, "user", { id: 0, email: "", password: "" });
      } else {
        setValue(hotelForm, "user", undefined);
      }
    })
  );

  const [hotelForm, { Form, Field, FieldArray }] = createForm<UpdateHotelForm>({
    validate: valiForm(UpdateHotelSchema),
    initialValues: {
      translates: [
        { id: 0, name: "", province: "", district: "", village: "" },
        { id: 0, name: "", province: "", district: "", village: "" },
        { id: 0, name: "", province: "", district: "", village: "" },
      ],
    },
  });

  createEffect(
    on(
      () => hotel(),
      (input) => {
        if (input) {
          setValues(hotelForm, {
            link: input.data.link,
            phone_number: input.data.phone_number,
            is_published: input.data.is_published,
            translates: [
              {
                id: input.data.translates[0].id,
                name: input.data.translates[0].name,
                province: input.data.translates[0].province,
                district: input.data.translates[0].district,
                village: input.data.translates[0].village,
              },
              {
                id: input.data.translates[1].id,
                name: input.data.translates[1].name,
                province: input.data.translates[1].province,
                district: input.data.translates[1].district,
                village: input.data.translates[1].village,
              },
              {
                id: input.data.translates[2].id,
                name: input.data.translates[2].name,
                province: input.data.translates[2].province,
                district: input.data.translates[2].district,
                village: input.data.translates[2].village,
              },
            ],
            user: input.data.user
              ? {
                  id: input.data.user.id,
                  email: input.data.user.email,
                }
              : {},
          });

          if (input.data.user) {
            setHaveAdmin(true);
          } else {
            setHaveAdmin(false);
          }

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
    const errors = getErrors(hotelForm);

    hotelForm.internal.initialValues.translates?.map((_, idx) => {
      if (
        errors[`translates.${idx as 0 | 1 | 2}.name`] ||
        errors[`translates.${idx as 0 | 1 | 2}.province`] ||
        errors[`translates.${idx as 0 | 1 | 2}.district`] ||
        errors[`translates.${idx as 0 | 1 | 2}.village`]
      ) {
        setTabsItems(idx, "alert", true);
      } else {
        setTabsItems(idx, "alert", false);
      }
    });
  });

  const handleSubmit: SubmitHandler<UpdateHotelForm> = async (values) => {
    if (hotel.state === "ready") {
      if (values.user) {
        if (!values.user.id && !values.user.password) {
          setError(() => ({ level: "warn", message: "ກະລຸນາປ້ອນລະຫັດຜ່ານ" }));
          return;
        }
      }

      const res = await updateHotelApi(param.id, values);

      actionMessage.showMessage({
        level: "success",
        message: res.data.message,
      });
    }
    navigator("/hotels", { resolve: false });
  };

  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ອັບເດດໂຮງແຮມ
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
                      }.name`}
                    >
                      {(field, props) => (
                        <InputText
                          label="ຊື່ຂອງໂຮງແຮມ"
                          required
                          {...props}
                          value={field.value}
                          error={field.error}
                          placeholder="ປ້ອນຊື່ຂອງໂຮງແຮມ"
                        />
                      )}
                    </Field>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <Field
                        name={`${fieldArray.name}.${
                          idx as unknown as 0 | 1 | 2
                        }.village`}
                      >
                        {(field, props) => (
                          <InputText
                            label="ບ້ານ"
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="ປ້ອນບ້ານ"
                          />
                        )}
                      </Field>
                      <Field
                        name={`${fieldArray.name}.${
                          idx as unknown as 0 | 1 | 2
                        }.district`}
                      >
                        {(field, props) => (
                          <InputText
                            label="ເມືອງ"
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="ປ້ອນເມືອງ"
                          />
                        )}
                      </Field>
                      <Field
                        name={`${fieldArray.name}.${
                          idx as unknown as 0 | 1 | 2
                        }.province`}
                      >
                        {(field, props) => (
                          <InputText
                            label="ແຂວງ"
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="ປ້ອນແຂວງ"
                          />
                        )}
                      </Field>
                    </div>
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
                setValue(hotelForm, "image", file);
              } else {
                reset(hotelForm, "image");
                setPreviewImg("");
              }
            }}
            error={field.error}
            helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 400x400px)."
          />
        )}
      </Field>

      <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
        <Field name="link">
          {(field, props) => (
            <InputText
              required
              label="ລິ້ງໂຮງແຮມ"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="Link"
            />
          )}
        </Field>
        <Field name="is_published" type="boolean">
          {(field, props) => (
            <Show when={field.value !== undefined}>
              <Toggle
                error={field.error}
                form={hotelForm}
                name={props.name}
                value={field.value}
                label="ການມອງເຫັນ"
              />
            </Show>
          )}
        </Field>

        <Field name="phone_number">
          {(field, props) => (
            <InputText
              required
              label="ເບີໂທ"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="ກະລຸນາປ້ອນເບີໂທ"
            />
          )}
        </Field>

        <Show when={haveAdmin() !== undefined}>
          <Toggle
            value={haveAdmin()}
            onValueChange={(val) => {
              setHaveAdmin(val);
            }}
            label="ມີແອັດມີນ"
          />
        </Show>
      </div>

      <Show when={haveAdmin()}>
        <>
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            ຂໍ້ມູນຜູ້ຈັດການໂຮງແຮມ
          </h2>
          <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
            <Field name="user.id">{(field, props) => <></>}</Field>

            <Field name="user.email">
              {(field, props) => (
                <InputText
                  label="ອີເມວ"
                  {...props}
                  value={field.value}
                  error={field.error}
                  placeholder="name@company.com"
                />
              )}
            </Field>

            <Field name="user.password">
              {(field, props) => (
                <PasswordInput
                  label="ລະຫັດຜ່ານ"
                  {...props}
                  value={field.value}
                  error={field.error}
                  placeholder="ປ້ອນລະຫັດຜ່ານ"
                />
              )}
            </Field>
          </div>
        </>
      </Show>

      <Show when={error()}>
        {(err) => (
          <Alert
            level={err().level}
            message={err().message}
            onClose={() => {
              setError(undefined);
            }}
          />
        )}
      </Show>

      <div class="flex items-center">
        <Button type="submit" isLoading={hotelForm.submitting} class="mr-3">
          ອັບເດດໂຮງແຮມ
        </Button>

        <Show
          when={checkPermission(
            Permission.Remove,
            PermissionGroup.Hotel,
            auth
          )}
        >
        <Button
          color="danger"
          outlined
          type="button"
          isLoading={hotelForm.submitting}
          prefixIcon={<TrashIcon />}
          onClick={() => {
            actionConfirm.showConfirm({
              icon: () => (
                <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
              ),
              message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
              onConfirm: async () => {
                const res = await deleteHotelApi(param.id);

                actionMessage.showMessage({
                  level: "success",
                  message: res.data.message,
                });

                navigator("/hotels/list", { resolve: false });
              },
            });
          }}
        >
          ລຶບ
        </Button>
        </Show>
      </div>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={hotel.loading}>
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
