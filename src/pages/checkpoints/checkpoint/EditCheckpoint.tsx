import {
  createForm,
  getErrors,
  reset,
  setValue,
  setValues,
  SubmitHandler,
  valiForm,
} from "@modular-forms/solid";
import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal, on, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { Transition } from "solid-transition-group";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Alert from "../../../components/alert/Alert";
import Button from "../../../components/button/Button";
import Checkbox from "../../../components/forms/check-box/Checkbox";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import InputText from "../../../components/forms/input-text/InputText";
import Select from "../../../components/forms/select/Select";
import Textarea from "../../../components/forms/textarea/Textarea";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useAxios } from "../../../contexts/axios/AxiosContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import { CheckpointCategoryTableState } from "../category/apis/checkpoint-category.interface";
import getCheckpointCategoryApi from "../category/apis/get-checkpoint-category.api";
import getProvinceApi from "../province/api/get-province.api";
import { ProvinceTableState } from "../province/api/province.interface";
import deleteCheckpointApi from "./apis/delete-checkpoint.api";
import getOneCheckpointApi from "./apis/get-one-checkpoint.api";
import updateCheckpointApi from "./apis/update-checkpoint.api";
import {
  UpdateCheckpointForm,
  UpdateCheckpointSchema,
} from "./schemas/update-checkpoint.schema";

export default () => {
  const {
    error: [error, setError],
  } = useAxios();
  const param = useParams();
  const [previewImg, setPreviewImg] = createSignal<string>("");
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();
  const [, actionConfirm] = useConfirm();
  const auth = useAuth();
  const [tabsItems, setTabsItems] = createStore<TabsItems>([
    { label: "ພາສາລາວ", key: "lo" },
    { label: "ພາສາອັງກິດ", key: "en" },
    { label: "ພາສາຈີນ", key: "zh_cn" },
  ]);

  if (!checkPermission(Permission.Write, PermissionGroup.Checkpoint, auth))
    navigator(-1);

  const [id] = createSignal<string>(param.id);
  const [checkpoint] = createResource(id, getOneCheckpointApi);

  const [catState] = createSignal<CheckpointCategoryTableState>({});
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

  const [form, { Form, Field, FieldArray }] = createForm<UpdateCheckpointForm>({
    validate: valiForm(UpdateCheckpointSchema),
    initialValues: {
      category_id: [],
      province_id: [],
      country: [],
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

  createEffect(
    on(checkpoint, (input) => {
      if (input) {
        const fromData: UpdateCheckpointForm = {
          category_id: [String(input.data.category_id)],
          province_id: [String(input.data.province_id)],
          country: [input.data.country],
          visa: input.data.visa,
          e_visa: input.data.e_visa,
          email: input.data.email,
          phone_number: input.data.phone_number,
          link_map: input.data.link_map,
          translates: [
            {
              id: input.data.translates[0].id,
              name: input.data.translates[0].name,
              address: input.data.translates[0].address,
              content: input.data.translates[0].content,
            },
            {
              id: input.data.translates[1].id,
              name: input.data.translates[1].name,
              address: input.data.translates[1].address,
              content: input.data.translates[1].content,
            },
            {
              id: input.data.translates[2].id,
              name: input.data.translates[2].name,
              address: input.data.translates[2].address,
              content: input.data.translates[2].content,
            },
          ],
        };
        setValues(form, fromData);

        setPreviewImg(
          input.data.image
            ? import.meta.env.VITE_IMG_URL + input.data.image
            : ""
        );
      }
    })
  );

  const handleSubmit: SubmitHandler<UpdateCheckpointForm> = async (values) => {
    const res = await updateCheckpointApi(id(), values);

    actionMessage.showMessage({ level: "success", message: res.data.message });

    navigator("/checkpoint");
  };

  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ແກ້ໄຂຂໍ້ມູນດ່ານ
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

        <Field name="country" type="string[]">
          {(field, props) => (
            <Select
              placeholder="ເລືອກຊາຍແດນປະເທດ"
              contentClass="w-fit"
              onValueChange={({ value }) => {
                setValue(form, "country", value);
              }}
              label="ເລືອກຊາຍແດນປະເທດ"
              name={props.name}
              items={[
                { label: "ຫວຽດນາມ", value: "vietnam" },
                { label: "ກຳປູເຈຍ", value: "cambodia" },
                { label: "ໄທ", value: "thailand" },
                { label: "ມຽນມ້າ", value: "myanmar" },
                { label: "ຈີນ", value: "china" },
              ]}
              error={field.error}
              value={field.value}
            ></Select>
          )}
        </Field>

        <div class="flex items-end h-full mb-4">
          <Field name="visa" type="boolean">
            {(field, props) => (
              <Checkbox
                label="ຮັບ Visa"
                required
                {...props}
                checked={field.value}
                error={field.error}
              />
            )}
          </Field>

          <Field name="e_visa" type="boolean">
            {(field, props) => (
              <Checkbox
                label="ຮັບ E Visa"
                required
                {...props}
                checked={field.value}
                error={field.error}
              />
            )}
          </Field>
        </div>
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

      <div class="flex items-center gap-3">
        <Button type="submit" isLoading={form.submitting}>
          ອັບເດດດ່ານ
        </Button>
        <Show
          when={checkPermission(
            Permission.Remove,
            PermissionGroup.Checkpoint,
            auth
          )}
        >
          <Button
            color="danger"
            outlined
            type="button"
            isLoading={form.submitting}
            prefixIcon={<TrashIcon />}
            onClick={() => {
              actionConfirm.showConfirm({
                icon: () => (
                  <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                ),
                message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                onConfirm: async () => {
                  const res = await deleteCheckpointApi(param.id);

                  actionMessage.showMessage({
                    level: "success",
                    message: res.data.message,
                  });

                  navigator("/checkpoint");
                },
              });
            }}
          >
            ລຶບ
          </Button>
        </Show>
      </div>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={category.loading}>
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
