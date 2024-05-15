import {
  SubmitHandler,
  createForm,
  getErrors,
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
import InputText from "../../../components/forms/input-text/InputText";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import createNewsCategoriesApi from "./api/create-news-categories.api";
import {
  NewCataegoriessForm,
  NewCataegoriessSchema,
} from "./schemas/news-categories.schema";

export default () => {
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

  const [newsCategoriessForm, { Form, Field, FieldArray }] =
    createForm<NewCataegoriessForm>({
      validate: valiForm(NewCataegoriessSchema),
      initialValues: {
        translates: [{ name: "" }, { name: "" }, { name: "" }],
      },
    });
  createEffect(() => {
    const errors = getErrors(newsCategoriessForm);

    newsCategoriessForm.internal.initialValues.translates?.map((_, idx) => {
      if (errors[`translates.${idx as 0 | 1 | 2}.name`]) {
        setTabsItems(idx, "alert", true);
      } else {
        setTabsItems(idx, "alert", false);
      }
    });
  });

  const handleSubmit: SubmitHandler<NewCataegoriessForm> = async (values) => {
    const res = await createNewsCategoriesApi(values);

    actionMessage.showMessage({ level: "success", message: res.data.message });

    navigator("newsCategoriess/list", { resolve: false });
  };
  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ເພີ່ມຂ່າວສານ
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
      <Button type="submit" isLoading={newsCategoriessForm.submitting}>
        ເພີ່ມຂ່າວສານ
      </Button>
    </Form>
  );
};
