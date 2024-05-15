import {
  createForm,
  getErrors,
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
import InputText from "../../../components/forms/input-text/InputText";
import Textarea from "../../../components/forms/textarea/Textarea";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useAxios } from "../../../contexts/axios/AxiosContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import deleteCheckpointCategoryApi from "./apis/delete-checkpoint-category.api";
import getOneCheckpointCategoryApi from "./apis/get-one-checkpoint-category.api";
import updateCheckpointCategoryApi from "./apis/update-checkpoint-category.api";
import {
  UpdateCheckpointCategoryForm,
  UpdateCheckpointCategorySchema,
} from "./schemas/update-checkpoint-category.schema";

export default () => {
  const {
    error: [error, setError],
  } = useAxios();
  const param = useParams();
  const [, actionMessage] = useMessage();
  const [, actionConfirm] = useConfirm();
  const navigator = useNavigate();
  const auth = useAuth();
  const [tabsItems, setTabsItems] = createStore<TabsItems>([
    { label: "ພາສາລາວ", key: "lo" },
    { label: "ພາສາອັງກິດ", key: "en" },
    { label: "ພາສາຈີນ", key: "zh_cn" },
  ]);

  if (!checkPermission(Permission.Write, PermissionGroup.Checkpoint, auth))
    navigator(-1);

  const [id] = createSignal<string>(param.id);
  const [category] = createResource(id, getOneCheckpointCategoryApi);

  const [form, { Form, Field, FieldArray }] =
    createForm<UpdateCheckpointCategoryForm>({
      validate: valiForm(UpdateCheckpointCategorySchema),
      initialValues: {
        translates: [
          { id: 0, title: "", description: "" },
          { id: 0, title: "", description: "" },
          { id: 0, title: "", description: "" },
        ],
      },
    });

  createEffect(() => {
    const errors = getErrors(form);

    form.internal.initialValues.translates?.map((_, idx) => {
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

  createEffect(
    on(category, (input) => {
      if (input) {
        const fromData: UpdateCheckpointCategoryForm = {
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
        setValues(form, fromData);
      }
    })
  );

  const handleSubmit: SubmitHandler<UpdateCheckpointCategoryForm> = async (
    values
  ) => {
    const res = await updateCheckpointCategoryApi(id(), values);

    actionMessage.showMessage({ level: "success", message: res.data.message });

    navigator("/checkpoint/category");
  };
  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ແກ້ໄຂປະເພດດ່ານ
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
                          label="ຊື່ປະເພດດ່ານ"
                          required
                          {...props}
                          value={field.value}
                          error={field.error}
                          placeholder="ປ້ອນຊື່ຂອງປະເພດດ່ານ"
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
                          label="ຄຳອະທິບາຍປະເພດດ່ານ"
                          {...props}
                          value={field.value}
                          error={field.error}
                          placeholder="ປ້ອນຄຳອະທິບາຍປະເພດດ່ານ"
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
          ອັບເດດປະເພດດ່ານ
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
                  const res = await deleteCheckpointCategoryApi(param.id);

                  actionMessage.showMessage({
                    level: "success",
                    message: res.data.message,
                  });

                  navigator("/checkpoint/category");
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
