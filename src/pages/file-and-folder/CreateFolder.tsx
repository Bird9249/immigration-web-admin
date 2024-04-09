import { createForm, SubmitHandler, valiForm } from "@modular-forms/solid";
import { Accessor, ParentProps, Show } from "solid-js";
import Alert from "../../components/alert/Alert";
import Button from "../../components/button/Button";
import InputText from "../../components/forms/input-text/InputText";
import { useAxios } from "../../contexts/axios/AxiosContext";
import createFolderApi from "./api/create-folder.api";
import { FolderSchema, FolderSchemaType } from "./schemas/folder.schema";

type Props = {
  folderId: Accessor<{
    parent_id: string;
  }>;
  onSuccess: () => void;
};

export default (props: ParentProps<Props>) => {
  const {
    error: [error, setError],
  } = useAxios();

  const [form, { Form, Field }] = createForm<FolderSchemaType>({
    validate: valiForm(FolderSchema),
  });

  const handleSubmit: SubmitHandler<FolderSchemaType> = async (values) => {
    const res = await createFolderApi(
      values,
      Number(props.folderId().parent_id)
    );

    if (res.status === 201) {
      props.onSuccess();
      setError(undefined);
    }
  };

  return (
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
        ເພີ່ມຂໍ້ມູນ
      </Button>
    </Form>
  );
};
