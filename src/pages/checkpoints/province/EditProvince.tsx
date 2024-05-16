import {
  SubmitHandler,
  createForm,
  getErrors,
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
import InputText from "../../../components/forms/input-text/InputText";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Tabs, { TabsItems } from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import deleteProvinceApi from "./api/delete-province.api";
import getProvinceDetailApi from "./api/get-province-detail.api";
import updateProvinceApi from "./api/update-province.api";
import getCountriesApi from "../../countries/countrie/api/get-countries.api";

import {
  UpdateProvinceSchema,
  UpdateProvincesForm,
} from "./schemas/province.schemas";
import Select from "../../../components/forms/select/Select";
import { CountriesTableState } from "../../countries/countrie/api/countries.interface";

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

  if (!checkPermission(Permission.Write, PermissionGroup.Checkpoint, auth))
    navigator(-1);

  const [provinceState] = createSignal<CountriesTableState>({});
  const [id] = createSignal<string>(param.id);
  const [lang, setLang] = createSignal<number>(0);
  const [provinces] = createResource(id, getProvinceDetailApi);
  const [provinceApi] = createResource(provinceState, getCountriesApi)
  const [provinceOptions, setprovinceOptions] = createSignal<
    { label: string; value: string }[]
  >([]);
  const [provinceForm, { Form, Field, FieldArray }] = createForm<UpdateProvincesForm>({
    validate: valiForm(UpdateProvinceSchema),
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
      () => provinces(),
      (input) => {
        if (input) {
          setValues(provinceForm, {
            country_ids: input.data.countries.map((val) => String(val.country.translates[0].id)),
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
          });
        }
      }
    )
  );
  createEffect(() => {
    const errors = getErrors(provinceForm);

    provinceForm.internal.initialValues.translates?.map((_, idx) => {
      if (errors[`translates.${idx as 0 | 1 | 2}.name`]) {
        setTabsItems(idx, "alert", true);
      } else {
        setTabsItems(idx, "alert", false);
      }
    });
    if (provinceApi.state === "ready") {
      setprovinceOptions(
        provinceApi().data.data.map((val) => ({
          label: val.translates[lang()].name,
          value: String(val.id),
        }))
      );
    }
  });

  const handleSubmit: SubmitHandler<UpdateProvincesForm> = async (values) => {
    if (provinces.state === "ready") {
      const res = await updateProvinceApi(param.id, values);

      actionMessage.showMessage({
        level: "success",
        message: res.data.message,
      });
    }
    navigator("/checkpoint/province", { resolve: false });
  };

  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ອັບເດດຂ່າວສານ
      </h2>
      <div class="grid gap-4 my-4 md:grid-cols-2 md:gap-6">
        <FieldArray name="translates">
          {(fieldArray) => (
            <Tabs
              onValueChange={(val) => {
                switch (val) {
                  case 'lo':
                    setLang(0)
                    break;

                  case 'en':
                    setLang(1)
                    break;

                  default:
                    setLang(2)
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
                        name={`${fieldArray.name}.${idx as unknown as 0 | 1 | 2
                          }.id`}
                        type="number"
                      >
                        {() => <></>}
                      </Field>
                      <Field
                        name={`${fieldArray.name}.${idx as unknown as 0 | 1 | 2
                          }.name`}
                      >
                        {(field, props) => (
                          <InputText
                            label="ຊືແຂວງ"
                            required
                            {...props}
                            value={field.value}
                            error={field.error}
                            placeholder="ປ້ອນຊື່ແຂວງ"
                          />
                        )}
                      </Field>
                      <Field name="country_ids" type="string[]">
                        {(field, props) => (
                          <Select
                            multiple
                            placeholder="ເລືອກປະເທດ"
                            contentClass="w-fit"
                            onValueChange={({ value }) => {
                              setValue(provinceForm, "country_ids", value);
                            }}
                            label="ເລືອກປະເທດ"
                            name={props.name}
                            items={provinceOptions()}
                            error={field.error}
                            value={field.value}
                          ></Select>
                        )}
                      </Field>
                    </div>
                  ),
                })
              )}
            />
          )}
        </FieldArray>

      </div>

      <div class="flex items-center">
        <Button type="submit" isLoading={provinceForm.submitting} class="mr-3">
          ອັບເດດແຂວງ
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
            isLoading={provinceForm.submitting}
            prefixIcon={<TrashIcon />}
            onClick={() => {
              actionConfirm.showConfirm({
                icon: () => (
                  <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                ),
                message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                onConfirm: async () => {
                  const res = await deleteProvinceApi(param.id);

                  actionMessage.showMessage({
                    level: "success",
                    message: res.data.message,
                  });

                  navigator("/checkpoint/province", { resolve: false });
                },
              });
            }}
          >
            ລຶບ
          </Button>
        </Show>
      </div>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={provinces.loading}>
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
