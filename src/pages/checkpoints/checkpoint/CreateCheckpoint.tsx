import {
  createForm,
  getErrors,
  reset,
  setValue,
  SubmitHandler,
  valiForm,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { createEffect, createResource, createSignal, Show } from "solid-js";
import { createStore } from "solid-js/store";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Alert from "../../../components/alert/Alert";
import Button from "../../../components/button/Button";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import InputText from "../../../components/forms/input-text/InputText";
import Select from "../../../components/forms/select/Select";
import Textarea from "../../../components/forms/textarea/Textarea";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useAxios } from "../../../contexts/axios/AxiosContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { CountriesTableState } from "../../countries/countrie/api/countries.interface";
import getCountriesApi from "../../countries/countrie/api/get-countries.api";
import { CheckpointCategoryTableState } from "../category/apis/checkpoint-category.interface";
import getCheckpointCategoryApi from "../category/apis/get-checkpoint-category.api";
import getProvinceApi from "../province/api/get-province.api";
import { ProvinceTableState } from "../province/api/province.interface";
import createCheckpointApi from "./apis/create-checkpoint.api";
import {
  CreateCheckpointForm,
  CreateCheckpointSchema,
} from "./schemas/create-checkpoint.schema";

export default () => {
  const {
    error: [error, setError],
  } = useAxios();
  const [previewImg, setPreviewImg] = createSignal<string>("");
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();
  const auth = useAuth();
  const [tabsItems, setTabsItems] = createStore<TabsItems>([
    { label: "ພາສາລາວ", key: "lo" },
    { label: "ພາສາອັງກິດ", key: "en" },
    { label: "ພາສາຈີນ", key: "zh_cn" },
  ]);

  if (!checkPermission(Permission.Write, PermissionGroup.Checkpoint, auth))
    navigator(-1);

  const [catState, setCatState] = createSignal<CheckpointCategoryTableState>(
    {}
  );
  const [catOptions, setCatOptions] = createSignal<
    { label: string; value: string }[]
  >([]);
  const [category] = createResource(catState, getCheckpointCategoryApi);
  createEffect(() => {
    if (category.state === "ready") {
      setCatOptions([
        ...category().data.data.map((val) => ({
          label: val.translates[0].title,
          value: String(val.id),
        })),
      ]);
    }
  });

  const [proState, setProState] = createSignal<ProvinceTableState>({});
  const [proOptions, setProOptions] = createSignal<
    { label: string; value: string }[]
  >([]);
  const [province] = createResource(proState, getProvinceApi);
  createEffect(() => {
    if (province.state === "ready") {
      setProOptions([
        ...province().data.data.map((val) => ({
          label: val.translates[0].name,
          value: String(val.id),
        })),
      ]);
    }
  });

  const [countryState, setCountryState] = createSignal<CountriesTableState>({});
  const [countryOptions, setCountryOptions] = createSignal<
    { label: string; value: string }[]
  >([]);
  const [country] = createResource(countryState, getCountriesApi);
  createEffect(() => {
    if (country.state === "ready") {
      setCountryOptions([
        { label: "ເລືອກປະເທດ", value: "0" },
        ...country().data.data.map((val) => ({
          label: val.translates[0].name,
          value: String(val.id),
        })),
      ]);
    }
  });

  const [form, { Form, Field, FieldArray }] = createForm<CreateCheckpointForm>({
    validate: valiForm(CreateCheckpointSchema),
    initialValues: {
      category_id: [],
      province_id: [],
      country_id: [],
      translates: [
        { name: "", content: "", address: "" },
        { name: "", content: "", address: "" },
        { name: "", content: "", address: "" },
      ],
    },
  });

  createEffect(() => {
    const errors = getErrors(form);

    form.internal.initialValues.translates?.map((_, idx) => {
      if (
        errors[`translates.${idx as 0 | 1 | 2}.name`] ||
        errors[`translates.${idx as 0 | 1 | 2}.content`] ||
        errors[`translates.${idx as 0 | 1 | 2}.address`]
      ) {
        setTabsItems(idx, "alert", true);
      } else {
        setTabsItems(idx, "alert", false);
      }
    });
  });

  const handleSubmit: SubmitHandler<CreateCheckpointForm> = async (values) => {
    const res = await createCheckpointApi(values);

    actionMessage.showMessage({ level: "success", message: res.data.message });

    navigator("/checkpoint");
  };

  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ເພີ່ມຂໍ້ມູນດ່ານ
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
                          label="ຊື່ດ່ານ"
                          required
                          {...props}
                          value={field.value}
                          error={field.error}
                          placeholder="ປ້ອນຊື່ຂອງດ່ານ"
                        />
                      )}
                    </Field>

                    <Field
                      name={`${fieldArray.name}.${
                        idx as unknown as 0 | 1 | 2
                      }.address`}
                    >
                      {(field, props) => (
                        <Textarea
                          label="ທີ່ຢູ່ດ່ານ"
                          {...props}
                          value={field.value}
                          error={field.error}
                          placeholder="ບ້ານ:... ເມືອງ:... ແຂວງ:..."
                        />
                      )}
                    </Field>

                    <Field
                      name={`${fieldArray.name}.${
                        idx as unknown as 0 | 1 | 2
                      }.content`}
                    >
                      {(field, props) => (
                        <Textarea
                          label="ເນື້ອຫາດ່ານ"
                          {...props}
                          value={field.value}
                          error={field.error}
                          placeholder="ປ້ອນເນື້ອຫາດ່ານ"
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

      <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field name="category_id" type="string[]">
          {(field, props) => (
            <Select
              placeholder="ເລືອກປະເພດດ່ານ"
              contentClass="w-fit"
              onValueChange={({ value }) => {
                setValue(form, "category_id", value);
              }}
              label="ເລືອກປະເພດດ່ານ"
              name={props.name}
              items={catOptions()}
              error={field.error}
              value={field.value}
              required
            ></Select>
          )}
        </Field>

        <Field name="province_id" type="string[]">
          {(field, props) => (
            <Select
              required
              placeholder="ເລືອກແຂວງທີ່ຢູ່ຂອງດ່ານ"
              contentClass="w-fit"
              onValueChange={({ value }) => {
                setValue(form, "province_id", value);
              }}
              label="ເລືອກແຂວງທີ່ຢູ່ຂອງດ່ານ"
              name={props.name}
              items={proOptions()}
              error={field.error}
              value={field.value}
            ></Select>
          )}
        </Field>

        <Field name="country_id" type="string[]">
          {(field, props) => (
            <Select
              placeholder="ເລືອກຊາຍແດນປະເທດ"
              contentClass="w-fit"
              onValueChange={({ value }) => {
                setValue(form, "country_id", value);
              }}
              label="ເລືອກຊາຍແດນປະເທດ"
              name={props.name}
              items={countryOptions()}
              error={field.error}
              value={field.value}
            ></Select>
          )}
        </Field>
      </div>

      <Field name="image" type="File">
        {(field, props) => (
          <ImageDropzone
            {...props}
            previewImage={[previewImg, setPreviewImg]}
            onSelectFile={(file) => {
              if (file) {
                setValue(form, "image", file);
              } else {
                reset(form, "image");
              }
            }}
            error={field.error}
            helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 300x300px)."
          />
        )}
      </Field>

      <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field name={`email`}>
          {(field, props) => (
            <InputText
              label="ອີເມວຕິດຕໍ່"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="ປ້ອນອີເມວຕິດຕໍ່"
            />
          )}
        </Field>

        <Field name={`phone_number`}>
          {(field, props) => (
            <InputText
              label="ເບີໂທຕິດຕໍ່"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="ປ້ອນເບີໂທຕິດຕໍ່"
            />
          )}
        </Field>
      </div>

      <div class="mb-4">
        <Field name={`link_map`}>
          {(field, props) => (
            <Textarea
              label="ແຜນທີ່"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="ປ້ອນແຜນທີ່"
            />
          )}
        </Field>
      </div>

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

      <Button type="submit" isLoading={form.submitting}>
        ເພີ່ມດ່ານ
      </Button>
    </Form>
  );
};
