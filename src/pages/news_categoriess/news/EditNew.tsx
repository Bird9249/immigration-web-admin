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
import Button from "../../../components/button/Button";
import Editor from "../../../components/forms/editor/Editor";
import ImageDropzone from "../../../components/forms/image-dropzone/ImageDropzone";
import InputText from "../../../components/forms/input-text/InputText";
import Select from "../../../components/forms/select/Select";
import Textarea from "../../../components/forms/textarea/Textarea";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import getNewsCategoriesApi from "../news_categories/api/get-news-categories.api";
import deleteNewsApi from "./api/delete-news.api";
import getNewsDetailApi from "./api/get-news-detail.api";
import { NewTableState } from "./api/news.interface";
import updateNewsApi from "./api/update-news.api";
import { UpdateNewsForm, UpdateNewsSchema } from "./schemas/news.schema";

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

  const [newsState] = createSignal<NewTableState>({
    offset: undefined,
    limit: undefined,
  });
  const [id] = createSignal<string>(param.id);
  const [news] = createResource(id, getNewsDetailApi);
  const [previewImg, setPreviewImg] = createSignal<string>("");
  const [newsApi] = createResource(newsState, getNewsCategoriesApi);

  const [newsOptions, setnewsOptions] = createSignal<
    { label: string; value: string }[]
  >([]);
  const [newsForm, { Form, Field, FieldArray }] = createForm<UpdateNewsForm>({
    validate: valiForm(UpdateNewsSchema),
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
      () => news(),
      (input) => {
        if (input) {
          setValues(newsForm, {
            category_id: [String(input.data.category_id)],
            status: [input.data.status],
            translates: [
              {
                id: input.data.translates[0].id,
                title: input.data.translates[0].title,
                content: JSON.stringify(input.data.translates[0].content),
                description: input.data.translates[0].description,
              },
              {
                id: input.data.translates[1].id,
                title: input.data.translates[1].title,
                content: JSON.stringify(input.data.translates[1].content),
                description: input.data.translates[1].description,
              },
              {
                id: input.data.translates[2].id,
                title: input.data.translates[2].title,
                content: JSON.stringify(input.data.translates[2].content),
                description: input.data.translates[2].description,
              },
            ],
          });
          setPreviewImg(
            input.data.thumbnail
              ? import.meta.env.VITE_IMG_URL + input.data.thumbnail
              : ""
          );
        }
      }
    )
  );
  createEffect(() => {
    const errors = getErrors(newsForm);

    newsForm.internal.initialValues.translates?.map((_, idx) => {
      if (
        errors[`translates.${idx as 0 | 1 | 2}.title`] ||
        errors[`translates.${idx as 0 | 1 | 2}.description`] ||
        errors[`translates.${idx as 0 | 1 | 2}.content`]
      ) {
        setTabsItems(idx, "alert", true);
      } else {
        setTabsItems(idx, "alert", false);
      }
    });
    if (newsApi.state === "ready") {
      setnewsOptions(
        newsApi().data.data.map((val) => ({
          label: val.translates[0].name,
          value: String(val.id),
        }))
      );
    }
  });

  const handleSubmit: SubmitHandler<UpdateNewsForm> = async (values) => {
    if (news.state === "ready") {
      const res = await updateNewsApi(param.id, values);

      actionMessage.showMessage({
        level: "success",
        message: res.data.message,
      });
    }
    navigator("/newsCategoriess/news", { resolve: false });
  };

  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ອັບເດດຂ່າວ
      </h2>
      <Field name="thumbnail" type="File">
        {(field, props) => (
          <ImageDropzone
            {...props}
            previewImage={[previewImg, setPreviewImg]}
            onSelectFile={(file) => {
              if (file) {
                setPreviewImg(URL.createObjectURL(file));
                setValue(newsForm, "thumbnail", file);
              } else {
                reset(newsForm, "thumbnail");
                setPreviewImg("");
              }
            }}
            error={field.error}
            helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 400x400px)."
          />
        )}
      </Field>
      <br />
      <div class="grid gap-4 my-4 md:grid-cols-2 md:gap-6">
        <Field name="category_id" type="string[]">
          {(field, props) => (
            <Select
              required
              placeholder="ເລືອກຂ່າວສານ"
              contentClass="w-fit"
              onValueChange={({ value }) => {
                setValue(newsForm, "category_id", value);
              }}
              label="ເລືອກຂ່າວ"
              name={props.name}
              items={newsOptions()}
              error={field.error}
              value={field.value}
            ></Select>
          )}
        </Field>
        <Field name="status" type="string[]">
          {(field, props) => (
            <Select
              placeholder="ເລືອກສະຖານະ"
              contentClass="w-44"
              onValueChange={({ value }) => {
                setValue(newsForm, "status", value);
              }}
              label="ສະຖານະ"
              name={props.name}
              items={[
                {
                  label: "ແບບຮ່າງ",
                  value: "draft",
                },
                {
                  label: "ເຜີຍແຜ່",
                  value: "published",
                },
                {
                  label: "ສ່ວນໂຕ",
                  value: "private",
                },
              ]}
              error={field.error}
              value={field.value}
            ></Select>
          )}
        </Field>
      </div>
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
                          label="ຫົວຂໍ້ຂ່າວ"
                          required
                          {...props}
                          value={field.value}
                          error={field.error}
                          placeholder="ປ້ອນຊື່ຫົວຂໍ້ຂ່າວ"
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
                          label="ເນື້ອຫາຂ່າວ"
                          required
                          value={field.value}
                          error={field.error}
                          onInput={(val) => {
                            setValue(
                              newsForm,
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
      <div class="flex items-center">
        <Button type="submit" isLoading={newsForm.submitting} class="mr-3">
          ອັບເດດຂ່າວ
        </Button>
        <Show
          when={checkPermission(Permission.Remove, PermissionGroup.News, auth)}
        >
          <Button
            color="danger"
            outlined
            type="button"
            isLoading={newsForm.submitting}
            prefixIcon={<TrashIcon />}
            onClick={() => {
              actionConfirm.showConfirm({
                icon: () => (
                  <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                ),
                message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                onConfirm: async () => {
                  const res = await deleteNewsApi(param.id);

                  actionMessage.showMessage({
                    level: "success",
                    message: res.data.message,
                  });

                  navigator("/newsCategoriess/news", { resolve: false });
                },
              });
            }}
          >
            ລຶບ
          </Button>
        </Show>
      </div>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={news.loading}>
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
