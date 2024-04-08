import {
  createForm,
  reset,
  setValue,
  SubmitHandler,
  valiForm,
} from "@modular-forms/solid";
import { Accessor, createSignal, ParentProps, Show } from "solid-js";
import Alert from "../../components/alert/Alert";
import Button from "../../components/button/Button";
import ImageDropzone from "../../components/forms/image-dropzone/ImageDropzone";
import { useAxios } from "../../contexts/axios/AxiosContext";
import createFileApi from "./api/create-file.api";
import { FileSchema, FileSchemaType } from "./schemas/file.schema";

type Props = {
  folderId: Accessor<{
    parent_id: string;
  }>;
  onSuccess: () => void;
};

export default (props: ParentProps<Props>) => {
  const [previewImg, setPreviewImg] = createSignal<string>("");
  const {
    error: [error, setError],
  } = useAxios();

  const [form, { Form, Field }] = createForm<FileSchemaType>({
    validate: valiForm(FileSchema),
  });

  const handleSubmit: SubmitHandler<FileSchemaType> = async (values) => {
    const res = await createFileApi(values, Number(props.folderId().parent_id));

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

      <Field name="file" type="File">
        {(field, props) => (
          <ImageDropzone
            {...props}
            previewImage={[previewImg, setPreviewImg]}
            onSelectFile={(file) => {
              if (file) {
                setValue(form, "file", file);
              } else {
                reset(form, "file");
              }
            }}
            error={field.error}
            helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 1440x500px)."
          />
        )}
      </Field>

      <Button type="submit" isLoading={form.submitting} class="mt-4">
        ເພີ່ມຂໍ້ມູນ
      </Button>
    </Form>
  );
};
