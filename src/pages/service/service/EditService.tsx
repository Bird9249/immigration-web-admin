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
import Textarea from "../../../components/forms/textarea/Textarea";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import getServiceByIdApi from "./api/get-service-by-id.api";
import updateServiceApi from "./api/update-service.api";
import {
  UpdateServiceSchema,
  UpdateServiceSchemaType,
} from "./schemas/update-service.schema";

export default () => {
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();
  const auth = useAuth();
  const param = useParams();

  if (!checkPermission(Permission.Write, PermissionGroup.Service, auth))
    navigator(-1);

  const [service] = createResource(param.id, getServiceByIdApi);

  const [tabsItems, setTabsItems] = createStore<TabsItems>([
    { label: "ພາສາລາວ", key: "lo" },
    { label: "ພາສາອັງກິດ", key: "en" },
    { label: "ພາສາຈີນ", key: "zh_cn" },
  ]);

  const [form, { Form, FieldArray, Field }] =
    createForm<UpdateServiceSchemaType>({
      validate: valiForm(UpdateServiceSchema),
      initialValues: {
        translates: [
          {
            id: 0,
            title: "",
            description: "",
            content: JSON.stringify({
              type: "doc",
              content: [],
            }),
          },
          {
            id: 0,
            title: "",
            description: "",
            content: JSON.stringify({
              type: "doc",
              content: [],
            }),
          },
          {
            id: 0,
            title: "",
            description: "",
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
      () => service(),
      (input) => {
        if (input) {
          const data: UpdateServiceSchemaType = {
            translates: [
              {
                id: input.data.translates[0].id,
                title: input.data.translates[0].title,
                description: input.data.translates[0].description,
                content: JSON.stringify(input.data.translates[0].content),
              },
              {
                id: input.data.translates[1].id,
                title: input.data.translates[1].title,
                description: input.data.translates[1].description,
                content: JSON.stringify(input.data.translates[1].content),
              },
              {
                id: input.data.translates[2].id,
                title: input.data.translates[2].title,
                description: input.data.translates[2].description,
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
        !!errors[`translates.${idx as 0 | 1 | 2}.title`] ||
        !!errors[`translates.${idx as 0 | 1 | 2}.content`]
      ) {
        setTabsItems(idx, "alert", true);
      } else {
        setTabsItems(idx, "alert", false);
      }
    });
  });

  const handleSubmit: SubmitHandler<UpdateServiceSchemaType> = async (
    values
  ) => {
    const res = await updateServiceApi(param.id, values);
    actionMessage.showMessage({ level: "success", message: res.data.message });
    navigator("/service");
  };

  return (
    <div class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ແກ້ໄຂຂໍ້ມູນການບໍລິການ
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
                              label="ຄຳອະທິບາຍ"
                              {...props}
                              value={field.value}
                              error={field.error}
                              placeholder="ປ້ອນຄຳອະທິບາຍ"
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
        <Show when={service.loading}>
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
