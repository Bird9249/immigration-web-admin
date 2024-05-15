import {
  createForm,
  setValue,
  SubmitHandler,
  valiForm,
} from "@modular-forms/solid";
import { Html5QrcodeScanner } from "html5-qrcode";
import { createSignal, For, onMount, ParentProps, Show } from "solid-js";
import Alert from "../../components/alert/Alert";
import Button from "../../components/button/Button";
import InputDatetime from "../../components/forms/input-datetime/InputDatetime";
import InputText from "../../components/forms/input-text/InputText";
import CloseIcon from "../../components/icons/CloseIcon";
import LoadingIcon from "../../components/icons/LoadingIcon";
import { useAxios } from "../../contexts/axios/AxiosContext";
import checkInApi from "./apis/check-in.api";
import checkVerifyCodeApi from "./apis/check-verify-code.api";
import {
  CheckInGuestSchema,
  CheckInGuestSchemaType,
} from "./schemas/check-in.schema";

type Props = {
  onClose: () => void;
};

export default ({ onClose }: ParentProps<Props>) => {
  const {
    error: [error, setError],
  } = useAxios();

  const [scanner, setScanner] = createSignal<Html5QrcodeScanner>();
  const [verifyCode, setVerifyCode] = createSignal<string>("");
  const [isScanLoading, setIsScanLoading] = createSignal<boolean>(false);

  const [form, { Form, Field, FieldArray }] =
    createForm<CheckInGuestSchemaType>({
      validate: valiForm(CheckInGuestSchema),
      initialValues: {
        check: ["", ""],
      },
    });

  async function resetScan(decodedText: string) {
    await scanner()!.clear();
    setIsScanLoading(true);

    await checkVerifyCodeApi(decodedText)
      .then(() => {
        setVerifyCode(decodedText);
        setValue(form, "verify_code", decodedText);
      })
      .finally(() => {
        setIsScanLoading(false);
      });
  }

  onMount(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "hotel-scan",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    setScanner(html5QrcodeScanner);

    scanner()!.render(resetScan, () => {});
  });

  const handleSubmit: SubmitHandler<CheckInGuestSchemaType> = async (
    values
  ) => {
    const res = await checkInApi(values);

    if (res.status === 201) {
      onClose();
      setError(undefined);
    }
  };

  return (
    <>
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            ເພີ່ມຂໍ້ມູນເຂົ້າພັກ
          </h3>
          <button
            type="button"
            class="text-gray-400 transition bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => {
              onClose();
            }}
          >
            <CloseIcon class="size-5" />
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <div class="flex justify-center flex-col items-center">
          <div id="hotel-scan" class="size-full"></div>
        </div>

        <Show when={error()}>
          {(err) => (
            <>
              <Alert
                level={err().level}
                message={err().message}
                onClose={() => {
                  setError(undefined);
                }}
              />

              <div class="flex justify-center pb-4">
                <Button
                  color="secondary"
                  onClick={() => {
                    setError(undefined);
                    setVerifyCode("");
                    scanner()!.render(resetScan, () => {});
                  }}
                >
                  ສະແກນໃໝ່
                </Button>
              </div>
            </>
          )}
        </Show>

        <Show when={verifyCode() && !error()}>
          <>
            <div class="mt-4 text-3xl text-primary-700 font-bold flex justify-center gap-x-2">
              <For each={verifyCode().split("")}>
                {(val) => <span>{val}</span>}
              </For>
            </div>

            <Form onSubmit={handleSubmit} class="px-4 pb-4 mt-4">
              <Field name="verify_code">{() => <></>}</Field>

              <Field name="room_no">
                {(field, props) => (
                  <InputText
                    label="ເລກຫ້ອງ"
                    {...props}
                    value={field.value}
                    error={field.error}
                    placeholder="ປ້ອນເລກຫ້ອງ"
                    class="mb-4"
                  />
                )}
              </Field>

              <FieldArray name="check">
                {(fieldArray) => (
                  <>
                    <For each={fieldArray.items}>
                      {(item, idx) => (
                        <Field
                          name={`${fieldArray.name}.${
                            idx().toString() as "0" | "1"
                          }`}
                        >
                          {(field, props) => (
                            <InputDatetime
                              required
                              label={idx() === 0 ? "ເວລາເຂົ້າພັກ" : "ເວລາອອກ"}
                              {...props}
                              value={field.value}
                              error={field.error}
                              class="mb-4"
                            />
                          )}
                        </Field>
                      )}
                    </For>

                    <Show when={fieldArray.error}>
                      <p class="mt-2 text-sm text-red-500 mb-4">
                        {fieldArray.error}
                      </p>
                    </Show>
                  </>
                )}
              </FieldArray>

              <div class="flex gap-3">
                <Button color="primary" type="submit">
                  ບັນທຶກ
                </Button>

                <Button
                  color="secondary"
                  onClick={() => {
                    setError(undefined);
                    setVerifyCode("");
                    scanner()!.render(resetScan, () => {});
                  }}
                >
                  ສະແກນໃໝ່
                </Button>
              </div>
            </Form>
          </>
        </Show>

        <Show when={isScanLoading()}>
          <div class="h-[300px] w-full flex justify-center items-center">
            <LoadingIcon class="animate-spin w-8 h-8" />
          </div>
        </Show>
      </div>
    </>
  );
};
