import {
  createForm,
  getErrors,
  SubmitHandler,
  valiForm,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { createEffect, createResource, createSignal, For } from "solid-js";

import { createStore } from "solid-js/store";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import Checkbox from "../../../components/forms/check-box/Checkbox";
import InputText from "../../../components/forms/input-text/InputText";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { CountriesTableState } from "../../countries/countrie/api/countries.interface";
import getCountriesApi from "../../countries/countrie/api/get-countries.api";
import createProvinceApi from "./api/create-province.api";
import { ProvinceForm, ProvincesSchema } from "./schemas/province.schemas";

export default () => {
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
  const [countryState] = createSignal<CountriesTableState>({});

  const [lang, setLang] = createSignal<number>(0);
  const [countrys] = createResource(countryState, getCountriesApi);
  const [countryOptions, setCountrysOptions] = createSignal<
    { label: string; value: string }[]
  >([]);
  const [provinceForm, { Form, Field, FieldArray }] = createForm<ProvinceForm>({
    validate: valiForm(ProvincesSchema),
    initialValues: {
      countries: [],
      translates: [{ name: "" }, { name: "" }, { name: "" }],
    },
  });

  createEffect(() => {
    const errors = getErrors(provinceForm);

    provinceForm.internal.initialValues.translates?.map((_, idx) => {
      if (errors[`translates.${idx as 0 | 1 | 2}.name`]) {
        setTabsItems(idx, "alert", true);
      } else {
        setTabsItems(idx, "alert", false);
      }
    });
  });

  createEffect(() => {
    if (countrys.state === "ready") {
      setCountrysOptions(
        countrys().data.data.map((val) => ({
          label: val.translates[lang()].name,
          value: String(val.id),
        }))
      );
    }
  });

  const handleSubmit: SubmitHandler<ProvinceForm> = async (values) => {
    const res = await createProvinceApi(values);

    actionMessage.showMessage({ level: "success", message: res.data.message });

    navigator("/checkpoint/province", { resolve: false });
  };
  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ເພີ່ມຂໍ້ມູນແຂວງ
      </h2>
      <div class="flex flex-col gap-4 my-4 ">
        <FieldArray name="translates">
          {(fieldArray) => (
            <Tabs
              onValueChange={(val) => {
                switch (val) {
                  case "lo":
                    setLang(0);
                    break;

                  case "en":
                    setLang(1);
                    break;

                  default:
                    setLang(2);
                    break;
                }
              }}
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
                            label="ຊື່ແຂວງ"
                            required
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="ປ້ອນຊື່ແຂວງ"
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

        <div>
          <span>ຊາຍແດນຕິດກັບປະເທດ</span>
          <div class="flex">
            <For
              each={[
                { label: "ຫວຽດນາມ", value: "vietnam" },
                { label: "ກຳປູເຈຍ", value: "cambodia" },
                { label: "ໄທ", value: "thailand" },
                { label: "ມຽນມ້າ", value: "myanmar" },
                { label: "ຈີນ", value: "china" },
              ]}
            >
              {({ label, value }) => (
                <Field name="countries" type="string[]">
                  {(field, props) => (
                    <>
                      <Checkbox
                        {...props}
                        checked={field.value?.includes(value)}
                        label={label}
                        error={field.error}
                        value={value}
                      />
                      {field.error}
                    </>
                  )}
                </Field>
              )}
            </For>
          </div>
        </div>
      </div>

      <Button type="submit" isLoading={provinceForm.submitting}>
        ເພີ່ມແຂວງ
      </Button>
    </Form>
  );
};
