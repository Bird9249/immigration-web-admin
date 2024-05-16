import {
  createForm,
  getErrors,
  SubmitHandler,
  valiForm,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { createEffect, Show } from "solid-js";
import { createStore } from "solid-js/store";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Alert from "../../../components/alert/Alert";
import Button from "../../../components/button/Button";
import InputText from "../../../components/forms/input-text/InputText";
import Textarea from "../../../components/forms/textarea/Textarea";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useAxios } from "../../../contexts/axios/AxiosContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import createCheckpointCategoryApi from "./apis/create-checkpoint-category.api";
import {
  CreateCheckpointCategoryForm,
  CreateCheckpointCategorySchema,
} from "./schemas/create-checkpoint-category.schema";

export default () => {
  const {
    error: [error, setError],
  } = useAxios();
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

  const [form, { Form, Field, FieldArray }] =
    createForm<CreateCheckpointCategoryForm>({
      validate: valiForm(CreateCheckpointCategorySchema),
      initialValues: {
        translates: [
          { title: "", description: "" },
          { title: "", description: "" },
          { title: "", description: "" },
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

  const handleSubmit: SubmitHandler<CreateCheckpointCategoryForm> = async (
    values
  ) => {
    const res = await createCheckpointCategoryApi(values);

    actionMessage.showMessage({ level: "success", message: res.data.message });

    navigator("/checkpoint/category");
  };
  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ເພີ່ມປະເພດດ່ານ
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

      <Button type="submit" isLoading={form.submitting}>
        ເພີ່ມປະເພດດ່ານ
      </Button>
    </Form>
  );
};
