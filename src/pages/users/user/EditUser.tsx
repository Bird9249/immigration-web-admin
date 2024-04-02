import {
  FormError,
  SubmitHandler,
  createForm,
  reset,
  setValue,
  setValues,
  valiForm,
} from "@modular-forms/solid";
import { useNavigate, useParams } from "@solidjs/router";
import { Show, createEffect, createResource, createSignal, on } from "solid-js";
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
import TrashIcon from "../../../components/icons/TrashIcon";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import getRoleApi from "../role/api/get-role.api";
import { RoleTableState } from "../role/api/role.interface";
import deleteUserApi from "./api/delete-user.api";
import getUserDetailApi from "./api/get-user-detail.api";
import updateUserApi from "./api/update-user.api";
import {
  UpdateUserForm,
  UpdateUserSchema,
  UserForm,
} from "./schemas/user.schema";

export default () => {
  const param = useParams();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();
  const auth = useAuth();

  if (!checkPermission(Permission.Write, PermissionGroup.User, auth))
    navigator(-1);

  const [id] = createSignal<string>(param.id);
  const [user] = createResource(id, getUserDetailApi);
  const [previewImg, setPreviewImg] = createSignal<string>("");

  const [userForm, { Form, Field }] = createForm<UpdateUserForm>({
    validate: valiForm(UpdateUserSchema),
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

  createEffect(
    on(
      () => user(),
      (input) => {
        if (input) {
          setValues(userForm, {
            firstName: input.data.profile.first_name,
            lastName: input.data.profile.last_name,
            email: input.data.email,
            roles: input.data.roles.map((val) => String(val.id)),
            password: undefined,
            confirmPassword: undefined,
          });
          setPreviewImg(
            input.data.profile.image
              ? import.meta.env.VITE_BASE_API_URL + input.data.profile.image
              : ""
          );
        }
      }
    )
  );

  const handleSubmit: SubmitHandler<UpdateUserForm> = async (values) => {
    if (values.password !== values.confirmPassword) {
      throw new FormError<UserForm>({
        confirmPassword: "ລະຫັດຜ່ານບໍ່ກົງກັນ",
      });
    }
    const res = await updateUserApi(param.id, values);

    actionMessage.showMessage({ level: "success", message: res.data.message });

    navigator("/users/list", { resolve: false });
  };

  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ອັບເດດຜູ້ໃຊ້
      </h2>
      <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
        <Field name="image" type="File">
          {(field, props) => (
            <InputFile
              label="ອັບໂຫລດໄຟລ໌"
              {...props}
              error={field.error}
              helpMessage="SVG, PNG, JPG ຫຼື GIF (MAX. 400x400px)."
              previewImage={
                <Avatar
                  alt="preview"
                  class="mb-4 sm:mb-0 mr-4 "
                  size="lg"
                  src={previewImg() ? previewImg() : undefined}
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
              placeholder="•••••••••"
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
              placeholder="•••••••••"
            />
          )}
        </Field>
      </div>

      <div class="flex items-center">
        <Button type="submit" isLoading={userForm.submitting} class="mr-3">
          ອັບເດດຜູ້ໃຊ້
        </Button>
        <Button
          color="danger"
          outlined
          type="button"
          isLoading={userForm.submitting}
          prefixIcon={<TrashIcon />}
          onClick={() => {
            actionConfirm.showConfirm({
              icon: () => (
                <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
              ),
              message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
              onConfirm: async () => {
                const res = await deleteUserApi(param.id);

                actionMessage.showMessage({
                  level: "success",
                  message: res.data.message,
                });

                navigator("/users/list", { resolve: false });
              },
            });
          }}
        >
          ລຶບ
        </Button>
      </div>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={user.loading}>
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
