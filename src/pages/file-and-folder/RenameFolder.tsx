import {
  createForm,
  setValue,
  SubmitHandler,
  valiForm,
} from "@modular-forms/solid";
import {
  Accessor,
  createEffect,
  on,
  ParentProps,
  Show,
  Signal,
} from "solid-js";
import Alert from "../../components/alert/Alert";
import Button from "../../components/button/Button";
import InputText from "../../components/forms/input-text/InputText";
import CloseIcon from "../../components/icons/CloseIcon";
import Modal from "../../components/modal/Modal";
import { useAxios } from "../../contexts/axios/AxiosContext";
import renameFolderApi from "./api/rename-folder.api";
import { FolderSchema, FolderSchemaType } from "./schemas/folder.schema";

type Props = {
  folderId: Accessor<{
    parent_id: string;
    name: string;
    id: number;
  }>;
  open: Signal<boolean>;
  onSuccess: () => void;
};

export default ({ open: [open, setOpen], ...props }: ParentProps<Props>) => {
  const {
    error: [error, setError],
  } = useAxios();

  const [form, { Form, Field }] = createForm<FolderSchemaType>({
    validate: valiForm(FolderSchema),
    initialValues: { name: props.folderId().name },
  });

  createEffect(
    on(open, (input) => {
      if (input) setValue(form, "name", props.folderId().name);
    })
  );

  const handleSubmit: SubmitHandler<FolderSchemaType> = async (values) => {
    const res = await renameFolderApi(
      props.folderId().id,
      values,
      Number(props.folderId().parent_id)
    );

    if (res.status === 200) {
      setOpen(false);
      props.onSuccess();
      setError(undefined);
    }
  };

  return (
    <Modal open={open()} size="sm" onOpenChange={({ open }) => setOpen(open)}>
      <div class="flex items-center justify-between p-3 border-b rounded-t dark:border-gray-600 mb-4">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          ປ່ຽນຊື່ໂຟນເດີ
        </h3>
        <button
          onClick={() => {
            setOpen(false);
          }}
          type="button"
          class="transition text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <CloseIcon class="size-4" />
          <span class="sr-only">Close modal</span>
        </button>
      </div>

      <div class="pb-4 px-4 relative">
        <Form onSubmit={handleSubmit} class="relative">
          <Show when={error()}>
            {(error) => (
              <Alert
                level={error().level}
                message={error().message}
                onClose={() => {
                  setError(undefined);
                }}
              />
            )}
          </Show>

          <Field name="name">
            {(field, props) => (
              <InputText
                required
                label="ຊື່ໂຟນເດີ"
                {...props}
                value={field.value}
                error={field.error}
                placeholder="ປ້ອນຊື່ໂຟນເດີ"
              />
            )}
          </Field>

          <Button type="submit" isLoading={form.submitting} class="mt-4">
            ອັບເດດ
          </Button>
        </Form>
      </div>
    </Modal>
  );
};
