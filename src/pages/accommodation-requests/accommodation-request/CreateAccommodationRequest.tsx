import {
  createForm,
  getErrors,
  setValue,
  SubmitHandler,
  valiForm,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import Editor from "../../../components/forms/editor/Editor";
import InputText from "../../../components/forms/input-text/InputText";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import createAccommodationRequestApi from "./api/create-accommodation-request.api";
import {
  CreateAccommodationRequestSchema,
  CreateAccommodationRequestSchemaType,
} from "./schemas/create-accommodation-request.schemas";

export default () => {
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();
  const auth = useAuth();

  if (
    !checkPermission(
      Permission.Write,
      PermissionGroup.AccommodationRequest,
      auth
    )
  )
    navigator(-1);

  const [tabsItems, setTabsItems] = createStore<TabsItems>([
    { label: "ພາສາລາວ", key: "lo" },
    { label: "ພາສາອັງກິດ", key: "en" },
    { label: "ພາສາຈີນ", key: "zh_cn" },
  ]);

  const [form, { Form, FieldArray, Field }] =
    createForm<CreateAccommodationRequestSchemaType>({
      validate: valiForm(CreateAccommodationRequestSchema),
      initialValues: {
        translates: [
          {
            title: "",
            content: JSON.stringify({
              type: "doc",
              content: [],
            }),
          },
          {
            title: "",
            content: JSON.stringify({
              type: "doc",
              content: [],
            }),
          },
          {
            title: "",
            content: JSON.stringify({
              type: "doc",
              content: [],
            }),
          },
        ],
      },
    });

  createEffect(() => {
    const errors = getErrors(form);

    form.internal.initialValues.translates?.map((_, idx) => {
      if (
        errors[`translates.${idx as 0 | 1 | 2}.title`] ||
        errors[`translates.${idx as 0 | 1 | 2}.content`]
      ) {
        setTabsItems(idx, "alert", true);
      } else {
        setTabsItems(idx, "alert", false);
      }
    });
  });

  const handleSubmit: SubmitHandler<
    CreateAccommodationRequestSchemaType
  > = async (values) => {
    const res = await createAccommodationRequestApi(values);
    actionMessage.showMessage({ level: "success", message: res.data.message });
    navigator("/accommodation-request");
  };

  return (
    <>
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ເພີ່ມຂໍ້ມູນການຮ້ອງຂໍທີ່ພັກ
      </h2>
      <Form onSubmit={handleSubmit}>
        <FieldArray name="translates">
          {(fieldArray) => (
            <Tabs
              items={tabsItems}
              contents={[{ key: "lo" }, { key: "en" }, { key: "zh_cn" }].map(
                (val, idx) => ({
                  ...val,
                  content: (
                    <div class="mt-4 flex flex-col gap-4">
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
                        }.content`}
                      >
                        {(field) => (
                          <Editor
                            label="ເນື້ອຫາ"
                            required
                            value={field.value}
                            error={field.error}
                            onInput={(val) => {
                              setValue(
                                form,
                                `${fieldArray.name}.${
                                  idx as unknown as 0 | 1 | 2
                                }.${"content"}`,
                                val
                              );
                            }}
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

        <Button
          color="primary"
          type="submit"
          class="mt-3"
          isLoading={form.submitting}
        >
          ເພີ່ມຂໍ້ມູນ
        </Button>
      </Form>
    </>
  );
};
