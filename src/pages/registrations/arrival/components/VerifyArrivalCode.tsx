import {
  createForm,
  reset,
  SubmitHandler,
  valiForm,
} from "@modular-forms/solid";
import { ParentProps, Show, Signal } from "solid-js";
import Alert from "../../../../components/alert/Alert";
import Button from "../../../../components/button/Button";
import InputText from "../../../../components/forms/input-text/InputText";
import CloseIcon from "../../../../components/icons/CloseIcon";
import Modal from "../../../../components/modal/Modal";
import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { useMessage } from "../../../../contexts/message/MessageContext";
import verifyArrivalCodeApi from "../api/verify-arrival-code.api";
import {
  VerifyArrivalCodeSchema,
  VerifyArrivalCodeSchemaType,
} from "../schemas/verify-arrival-code.schema";

type Props = {
  open: Signal<boolean>;
  onSuccess: () => void;
};

export default ({ open: [open, setOpen], onSuccess }: ParentProps<Props>) => {
  const [, actionMessage] = useMessage();
  const {
    error: [error, setError],
  } = useAxios();

  const [form, { Form, Field }] = createForm<VerifyArrivalCodeSchemaType>({
    validate: valiForm(VerifyArrivalCodeSchema),
  });

  const handleSubmit: SubmitHandler<VerifyArrivalCodeSchemaType> = async (
    values
  ) => {
    values.verification_code = values.verification_code.toUpperCase();
    const res = await verifyArrivalCodeApi(values);

    if (res) {
      setOpen(false);
      onSuccess();
      reset(form);

      actionMessage.showMessage({
        level: "success",
        message: res.data.message,
      });
    }
  };

  return (
    <Modal
      onOpenChange={({ open }) => {
        setOpen(open);
      }}
      open={open()}
    >
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            ກວດສອບລະຫັດລົງທະບຽນເຂົ້າເມືອງ
          </h3>
          <button
            onClick={() => setOpen(false)}
            type="button"
            class="text-gray-400 transition bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <CloseIcon class="size-5" />
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <div class="p-4 md:p-5">
          <Form onSubmit={handleSubmit} class="relative">
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

            <Field name="verification_code">
              {(field, props) => (
                <InputText
                  required
                  label="ລະຫັດຢືນຢັນ"
                  {...props}
                  value={field.value}
                  error={field.error}
                  placeholder="ປ້ອນລະຫັດຢືນຢັນ"
                />
              )}
            </Field>

            <Button type="submit" isLoading={form.submitting} class="mt-4">
              ກວດສອບ
            </Button>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
