import { SubmitHandler, createForm, valiForm } from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { For, Show, createEffect, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import { Transition } from "solid-transition-group";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import Checkbox from "../../../components/forms/check-box/Checkbox";
import InputText from "../../../components/forms/input-text/InputText";
import Textarea from "../../../components/forms/textarea/Textarea";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import getPermissionApi from "../permission/api/get-permission.api";
import { GroupedPermission } from "../permission/api/permission.interface";
import convertPermissions from "../permission/utils/convert-permissions";
import createRoleApi from "./api/create-role.api";
import { RoleForm, RoleSchema } from "./schemas/role.schema";

export default () => {
  const [userForm, { Form, Field }] = createForm<RoleForm>({
    validate: valiForm(RoleSchema),
    initialValues: {
      permissions: [],
    },
  });
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();
  const auth = useAuth();

  if (!checkPermission(Permission.Write, PermissionGroup.User, auth))
    navigator(-1);

  const [permissions] = createResource(getPermissionApi);
  const [permissionOptions, setPermissionOptions] = createStore<{
    data: GroupedPermission[] | undefined;
  }>({ data: undefined });

  createEffect(() => {
    if (permissions.state === "ready") {
      setPermissionOptions("data", convertPermissions(permissions().data));
    }
  });

  const handleSubmit: SubmitHandler<RoleForm> = async (values) => {
    const res = await createRoleApi(values);

    actionMessage.showMessage({
      level: "success",
      message: res.data.message,
    });

    navigator("users/roles", { resolve: false });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ເພີ່ມບົດບາດໃຫມ່
      </h2>
      <div class="grid gap-4 mb-4">
        <Field name="name">
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

        <Field name="description">
          {(field, props) => (
            <Textarea
              required
              label="ຄຳອະທິບາຍ"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="ຂຽນຄໍາອະທິບາຍ..."
            />
          )}
        </Field>

        <div class="relative min-h-52">
          <Show when={permissionOptions.data} fallback={<>Loading...</>}>
            <label class="mb-2 font-semibold text-gray-900 dark:text-white">
              ການອະນຸຍາດ
            </label>
            <div class="flex flex-wrap gap-3">
              <Field name="permissions" type="string[]">
                {(field, props) => (
                  <For each={permissionOptions.data}>
                    {(list) => (
                      <div class="w-44">
                        <h3 class="block mb-2 text-sm font-medium dark:text-white ">
                          {list.group}
                        </h3>
                        <ul class="w-44 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <For each={list.items}>
                            {({ value, label }) => (
                              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <Checkbox
                                  label={label}
                                  {...props}
                                  value={value}
                                  checked={field.value?.includes(value)}
                                />
                              </li>
                            )}
                          </For>
                        </ul>
                      </div>
                    )}
                  </For>
                )}
              </Field>
            </div>
          </Show>

          <Transition onEnter={fadeIn} onExit={fadeOut}>
            <Show when={permissions.loading}>
              <div
                class={`absolute z-10 top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center rounded-lg`}
              >
                <div>
                  <LoadingIcon class="animate-spin w-8 h-8" />
                </div>
              </div>
            </Show>
          </Transition>
        </div>
      </div>

      <Button type="submit" isLoading={userForm.submitting}>
        ເພີ່ມບົດບາດ
      </Button>
    </Form>
  );
};
