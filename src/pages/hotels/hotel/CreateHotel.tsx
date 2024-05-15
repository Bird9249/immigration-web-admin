import {
  createForm,
  getErrors,
  reset,
  setValue,
  SubmitHandler,
  valiForm,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal, on, Show } from "solid-js";
import { createStore } from "solid-js/store";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import InputText from "../../../components/forms/input-text/InputText";
import PasswordInput from "../../../components/forms/password-input/PasswordInput";
import Toggle from "../../../components/forms/toggle/Toggle";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import createHotelApi from "./api/create-hotel.api";
import { HotelForm, HotelSchema } from "./schemas/hotel.schemas";
import { useAxios } from "../../../contexts/axios/AxiosContext";

export default () => {
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();
  const auth = useAuth();
  const [tabsItems, setTabsItems] = createStore<TabsItems>([
    { label: "ພາສາລາວ", key: "lo" },
    { label: "ພາສາອັງກິດ", key: "en" },
    { label: "ພາສາຈີນ", key: "zh_cn" },
  ]);
  const {
    error: [error, setError],
  } = useAxios();

  if (!checkPermission(Permission.Write, PermissionGroup.Hotel, auth))
    navigator(-1);

  const [previewImg, setPreviewImg] = createSignal<string>("");

  const [haveAdmin, setHaveAdmin] = createSignal<boolean>(false);

  createEffect(
    on(haveAdmin, (input) => {
      if (input) {
        setValue(hotelForm, "user", { email: "", password: "" });
      } else {
        setValue(hotelForm, "user", undefined);
      }
    })
  );

  const [hotelForm, { Form, Field, FieldArray }] = createForm<HotelForm>({
    validate: valiForm(HotelSchema),
    initialValues: {
      translates: [
        { name: "", province: "", district: "", village: "" },
        { name: "", province: "", district: "", village: "" },
        { name: "", province: "", district: "", village: "" },
      ],
    },
  });

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

  const handleSubmit: SubmitHandler<HotelForm> = async (values) => {
    const res = await createHotelApi(values);

    actionMessage.showMessage({ level: "success", message: res.data.message });

    navigator("hotels", { resolve: false });
  };
  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ເພີ່ມໂຮງແຮມ
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
                setValue(hotelForm, "image", file);
              } else {
                reset(hotelForm, "image");
              }
            }}
            error={field.error}
            helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 500x500px)."
          />
        )}
      </Field>
      <br />
      <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
        <Field name="link">
          {(field, props) => (
            <InputText
              required
              label="ລິ້ງໂຮງແຮມ"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="ກະລຸນາໃສ່ປ້ອນລິ້ງ"
            />
          )}
        </Field>

        <Field name="is_published" type="boolean">
          {(field, props) => (
            <Toggle
              error={field.error}
              form={hotelForm}
              name={props.name}
              value={field.value}
              label="ການມອງເຫັນ"
            />
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
              placeholder="ປ້ອນເບີໂທ"
            />
          )}
        </Field>
        <Toggle
          value={haveAdmin()}
          onValueChange={(val) => {
            setHaveAdmin(val);
          }}
          label="ມີແອັດມີນ"
        />
      </div>

      <Show when={haveAdmin()}>
        <>
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            ຂໍ້ມູນຜູ້ຈັດການໂຮງແຮມ
          </h2>
          <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
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

      <Button type="submit" isLoading={hotelForm.submitting}>
        ເພີ່ມໂຮງແຮມ
      </Button>
    </Form>
  );
};
