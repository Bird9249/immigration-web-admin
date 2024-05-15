import {
    SubmitHandler,
    createForm,
    getErrors,
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
  import Button from "../../../components/button/Button";
  import InputText from "../../../components/forms/input-text/InputText";
  import LoadingIcon from "../../../components/icons/LoadingIcon";
  import TrashIcon from "../../../components/icons/TrashIcon";
  import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
  import { useAuth } from "../../../contexts/authentication/AuthContext";
  import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
  import { useMessage } from "../../../contexts/message/MessageContext";
  import { fadeIn, fadeOut } from "../../../utils/transition-animation";
  import deleteNewsCategoriesApi from "./api/delete-news-categories.api";
  import getNewsCategoriessDetailApi from "./api/get-news-categoriess-detail.api";
  import updateNewsCategoriesApi from "./api/update-news-categories.api";
  import {
    UpdateNewCataegoriessForm,
    UpdateNewCataegoriessSchema,
  } from "./schemas/news-categories.schema";
  
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
  
    if (!checkPermission(Permission.Write, PermissionGroup.News, auth))
      navigator(-1);
  
    const [id] = createSignal<string>(param.id);
    const [newsCategoriess] = createResource(id, getNewsCategoriessDetailApi);
    const [previewImg, setPreviewImg] = createSignal<string>("");
  
    const [form, { Form, Field, FieldArray }] =
      createForm<UpdateNewCataegoriessForm>({
        validate: valiForm(UpdateNewCataegoriessSchema),
        initialValues: {
          translates: [
            { id: 0, name: "" },
            { id: 0, name: "" },
            { id: 0, name: "" },
          ],
        },
      });
    createEffect(
      on(
        () => newsCategoriess(),
        (input) => {
          if (input) {
            const oldData: UpdateNewCataegoriessForm = {
              translates: [
                {
                  id: input.data.translates[0].id,
                  name: input.data.translates[0].name,
                },
                {
                  id: input.data.translates[1].id,
                  name: input.data.translates[1].name,
                },
                {
                  id: input.data.translates[2].id,
                  name: input.data.translates[2].name,
                },
              ],
            };
  
            setValues(form, oldData);
          }
        }
      )
    );
    createEffect(() => {
      const errors = getErrors(form);
  
      form.internal.initialValues.translates?.map((_, idx) => {
        if (errors[`translates.${idx as 0 | 1 | 2}.name`]) {
          setTabsItems(idx, "alert", true);
        } else {
          setTabsItems(idx, "alert", false);
        }
      });
    });
  
    const handleSubmit: SubmitHandler<UpdateNewCataegoriessForm> = async (
      values
    ) => {
      if (newsCategoriess.state === "ready") {
        const res = await updateNewsCategoriesApi(param.id, values);
  
        actionMessage.showMessage({
          level: "success",
          message: res.data.message,
        });
      }
      navigator("/newsCategoriess/list", { resolve: false });
    };
  
    return (
      <Form onSubmit={handleSubmit} class="relative">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          ອັບເດດຂ່າວສານ
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
                            label="ຊື່ຂ່າວສານ"
                            required
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="ປ້ອນຊື່ຂອງຂ່າວສານ"
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
        <div class="flex items-center">
          <Button type="submit" isLoading={form.submitting} class="mr-3">
            ອັບເດດໂຮງແຮມ
          </Button>
          <Show
            when={checkPermission(Permission.Remove, PermissionGroup.News, auth)}
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
                    const res = await deleteNewsCategoriesApi(param.id);
  
                    actionMessage.showMessage({
                      level: "success",
                      message: res.data.message,
                    });
  
                    navigator("/newsCategoriess/list", { resolve: false });
                  },
                });
              }}
            >
              ລຶບ
            </Button>
          </Show>
        </div>
  
        <Transition onEnter={fadeIn} onExit={fadeOut}>
          <Show when={newsCategoriess.loading}>
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