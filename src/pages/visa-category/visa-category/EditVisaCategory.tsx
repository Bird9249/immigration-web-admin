import {
  createForm,
  getErrors,
  setValue,
  setValues,
  SubmitHandler,
  valiForm,
} from "@modular-forms/solid";
import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createResource, on, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { Transition } from "solid-transition-group";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import Editor from "../../../components/forms/editor/Editor";
import InputText from "../../../components/forms/input-text/InputText";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import getVisaCategoryByIdApi from "./api/get-visa-category-by-id.api";
import updateVisaCategoryApi from "./api/update-visa-category.api";
import {
  UpdateVisaCategorySchema,
  UpdateVisaCategorySchemaType,
} from "./schemas/update-visa-category.schema";

export default () => {
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();
  const auth = useAuth();
  const param = useParams();

  if (!checkPermission(Permission.Write, PermissionGroup.VisaCategory, auth))
    navigator(-1);

  const [visaCategory] = createResource(param.id, getVisaCategoryByIdApi);

  const [tabsItems, setTabsItems] = createStore<TabsItems>([
    { label: "ພາສາລາວ", key: "lo" },
    { label: "ພາສາອັງກິດ", key: "en" },
    { label: "ພາສາຈີນ", key: "zh_cn" },
  ]);

  const [form, { Form, FieldArray, Field }] =
    createForm<UpdateVisaCategorySchemaType>({
      validate: valiForm(UpdateVisaCategorySchema),
      initialValues: {
        translates: [
          {
            id: 0,
            name: "",
            content: JSON.stringify({
              type: "doc",
              content: [],
            }),
          },
          {
            id: 0,
            name: "",
            content: JSON.stringify({
              type: "doc",
              content: [],
            }),
          },
          {
            id: 0,
            name: "",
            content: JSON.stringify({
              type: "doc",
              content: [],
            }),
          },
        ],
      },
    });

  createEffect(
    on(
      () => visaCategory(),
      (input) => {
        if (input) {
          const data: UpdateVisaCategorySchemaType = {
            translates: [
              {
                id: input.data.translates[0].id,
                name: input.data.translates[0].name,
                content: JSON.stringify(input.data.translates[0].content),
              },
              {
                id: input.data.translates[1].id,
                name: input.data.translates[1].name,
                content: JSON.stringify(input.data.translates[1].content),
              },
              {
                id: input.data.translates[2].id,
                name: input.data.translates[2].name,
                content: JSON.stringify(input.data.translates[2].content),
              },
            ],
          };

          setValues(form, data);
        }
      }
    )
  );

  createEffect(() => {
    const errors = getErrors(form);

    form.internal.initialValues.translates?.map((_, idx) => {
      if (
        !!errors[`translates.${idx as 0 | 1 | 2}.name`] ||
        !!errors[`translates.${idx as 0 | 1 | 2}.content`]
      ) {
        setTabsItems(idx, "alert", true);
      } else {
        setTabsItems(idx, "alert", false);
      }
    });
  });

  const handleSubmit: SubmitHandler<UpdateVisaCategorySchemaType> = async (
    values
  ) => {
    const res = await updateVisaCategoryApi(param.id, values);
    actionMessage.showMessage({ level: "success", message: res.data.message });
    navigator("/visa-category");
  };

  return (
    <div class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ແກ້ໄຂຂໍ້ມູນປະເພດວີຊາ
      </h2>

      <Form onSubmit={handleSubmit}>
        <FieldArray name="translates">
          {(fieldArray) => (
            <>
              <Tabs
                items={tabsItems}
                contents={[{ key: "lo" }, { key: "en" }, { key: "zh_cn" }].map(
                  (val, idx) => ({
                    ...val,
                    content: (
                      <div class="mt-4 flex flex-col gap-4">
                        <Field
                          name={`translates.${idx as unknown as 0 | 1 | 2}.id`}
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
                              label="ຊື່ປະເພດວີຊາ"
                              required
                              {...props}
                              value={field.value}
                              error={field.error}
                              placeholder="ປ້ອນຊື່ປະເພດວີຊາ"
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
            </>
          )}
        </FieldArray>

        <Button
          color="primary"
          type="submit"
          class="mt-3"
          isLoading={form.submitting}
        >
          ບັນທຶກ
        </Button>
      </Form>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={visaCategory.loading}>
          <div
            class={`absolute z-10 top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center`}
          >
            <div>
              <LoadingIcon class="animate-spin w-8 h-8" />
            </div>
          </div>
        </Show>
      </Transition>
    </div>
  );
};
