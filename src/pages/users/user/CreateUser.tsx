import {
  FormError,
  SubmitHandler,
  createForm,
  reset,
  setValue,
  valiForm,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { Show, createEffect, createResource, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Avatar from "../../../components/avatar/Avatar";
import Button from "../../../components/button/Button";
import InputFile from "../../../components/forms/input-file/InputFile";
import InputText from "../../../components/forms/input-text/InputText";
import PasswordInput from "../../../components/forms/password-input/PasswordInput";
import Select from "../../../components/forms/select/Select";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import getRoleApi from "../role/api/get-role.api";
import { RoleTableState } from "../role/api/role.interface";
import createUserApi from "./api/create-user.api";
import { UserForm, UserSchema } from "./schemas/user.schema";

export default () => {
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();
  const auth = useAuth();

  if (!checkPermission(Permission.Write, PermissionGroup.User, auth))
    navigator(-1);

  const [previewImg, setPreviewImg] = createSignal<string>("");

  const [userForm, { Form, Field }] = createForm<UserForm>({
    validate: valiForm(UserSchema),
    initialValues: {
      roles: [],
    },
  });

  const [roleState] = createSignal<RoleTableState>({
    offset: undefined,
    limit: undefined,
  });
  const [roles] = createResource(roleState, getRoleApi);
  const [roleOptions, setRoleOptions] = createSignal<
    { label: string; value: string }[]
  >([]);

  createEffect(() => {
    if (roles.state === "ready") {
      setRoleOptions(
        roles().data.data.map((val) => ({
          label: val.name,
          value: String(val.id),
        }))
      );
    }
  });

  const handleSubmit: SubmitHandler<UserForm> = async (values) => {
    if (values.password !== values.confirmPassword) {
      throw new FormError<UserForm>({
        confirmPassword: "password dose not match",
      });
    }

    const res = await createUserApi(values);

    actionMessage.showMessage({ level: "success", message: res.data.message });

    navigator("users/list", { resolve: false });
  };

  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ເພີ່ມຜູ້ໃຊ້ໃໝ່
      </h2>
      <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
        <Field name="image" type="File">
          {(field, props) => (
            <InputFile
              label="ອັບໂຫລດໄຟລ໌"
              {...props}
              error={field.error}
              helpMessage="SVG, PNG, JPG, Webp, ຫຼື GIF (MAX. 400x400px)."
              previewImage={
                <Avatar
                  alt="preview"
                  class="mb-4 sm:mb-0 mr-4 "
                  size="lg"
                  src={previewImg()}
                />
              }
              onSelectFile={(files) => {
                if (files.length <= 0) {
                  setPreviewImg("");
                  reset(userForm, "image");
                } else {
                  setPreviewImg(URL.createObjectURL(files[0]));
                  setValue(userForm, "image", files[0]);
                }
              }}
            />
          )}
        </Field>

        <Field name="firstName">
          {(field, props) => (
            <InputText
              required
              label="ຊື່"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="ຊື່"
            />
          )}
        </Field>
        <Field name="lastName">
          {(field, props) => (
            <InputText
              required
              label="ນາມສະກຸນ"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="ນາມສະກຸນ"
            />
          )}
        </Field>

        <Field name="email">
          {(field, props) => (
            <InputText
              required
              label="ອີເມວ"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="name@company.com"
            />
          )}
        </Field>

        <Field name="roles" type="string[]">
          {(field, props) => (
            <Select
              placeholder="ເລືອກບົດບາດ"
              contentClass="w-44"
              multiple
              onValueChange={({ value }) => {
                setValue(userForm, "roles", value);
              }}
              label="ບົດບາດຜູ້ໃຊ້"
              name={props.name}
              items={roleOptions()}
              error={field.error}
              value={field.value}
            ></Select>
          )}
        </Field>

        <Field name="password">
          {(field, props) => (
            <PasswordInput
              required
              label="ລະຫັດຜ່ານ"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="ປ້ອນລະຫັດຜ່ານ"
            />
          )}
        </Field>

        <Field name="confirmPassword">
          {(field, props) => (
            <PasswordInput
              required
              label="ຢືນ​ຢັນ​ລະ​ຫັດ"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="ຢືນຢັນລະຫັດຜ່ານ"
            />
          )}
        </Field>
      </div>

      <Button type="submit" isLoading={userForm.submitting}>
        ເພີ່ມຜູ້ໃຊ້
      </Button>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={roles.loading}>
          <div
            class={`absolute z-10 top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center rounded-lg`}
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
