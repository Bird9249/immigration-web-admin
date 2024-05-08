import {
  createForm,
  reset,
  SubmitHandler,
  valiForm,
} from "@modular-forms/solid";
import { ParentProps, Show, Signal } from "solid-js";
import Alert from "../../../../components/alert/Alert";
import Button from "../../../../components/button/Button";
import InputNumber from "../../../../components/forms/input-number/InputNumber";
import CloseIcon from "../../../../components/icons/CloseIcon";
import Modal from "../../../../components/modal/Modal";
import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { NumberSchema, NumberSchemaType } from "../schemas/number.schema";

type Props = {
  open: Signal<boolean>;
  onOpenChange: (open: boolean) => void;
  submit: SubmitHandler<NumberSchemaType>;
};

export default (props: ParentProps<Props>) => {
  const {
    error: [error, setError],
  } = useAxios();

  const [form, { Form, Field }] = createForm<NumberSchemaType>({
    validate: valiForm(NumberSchema),
  });

  return (
    <Modal
      onOpenChange={({ open }) => {
        props.onOpenChange(open);
      }}
      open={props.open[0]()}
    >
      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          ຈຳນວນການລົງທະບຽນ
        </h3>

        <button
          onClick={() => {
            props.open[1]((prev) => !prev);
          }}
          type="button"
          class="transition text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <CloseIcon class="size-5" />
          <span class="sr-only">Close modal</span>
        </button>
      </div>

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

      <Form
        onSubmit={async (values, e) => {
          await props.submit(values, e);
          reset(form);
        }}
        class="px-4 pb-4 mt-4"
      >
        <Field name="number" type="number">
          {(field, props) => (
            <InputNumber
              label="ຈຳນວນ"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="ປ້ອນຈຳນວນ"
              class="mb-4"
            />
          )}
        </Field>

        <Button color="primary" type="submit" isLoading={form.submitting}>
          ບັນທຶກ
        </Button>
      </Form>
    </Modal>
  );
};
