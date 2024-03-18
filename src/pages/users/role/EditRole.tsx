import {
  SubmitHandler,
  createForm,
  setValues,
  valiForm,
} from "@modular-forms/solid";
import { useNavigate, useParams } from "@solidjs/router";
import { For, Show, createEffect, createResource, on } from "solid-js";
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
import TrashIcon from "../../../components/icons/TrashIcon";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import getPermissionApi from "../permission/api/get-permission.api";
import { GroupedPermission } from "../permission/api/permission.interface";
import convertPermissions from "../permission/utils/convert-permissions";
import deleteRoleApi from "./api/delete-role.api";
import getRoleDetailApi from "./api/get-role-detail.api";
import updateRoleApi from "./api/update-role.api";
import { RoleForm, RoleSchema } from "./schemas/role.schema";

export default () => {
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();
  const param = useParams();
  const [, actionConfirm] = useConfirm();
  const auth = useAuth();

  if (!checkPermission(Permission.Write, PermissionGroup.User, auth))
    navigator(-1);

  const [role] = createResource(param.id, getRoleDetailApi);

  const [roleForm, { Form, Field }] = createForm<RoleForm>({
    validate: valiForm(RoleSchema),
    initialValues: {
      permissions: [],
    },
  });

  const [permissions] = createResource(getPermissionApi);
  const [permissionOptions, setPermissionOptions] = createStore<{
    data: GroupedPermission[] | undefined;
  }>({ data: undefined });

  createEffect(() => {
    if (permissions.state === "ready") {
      setPermissionOptions("data", convertPermissions(permissions().data));
    }
  });

  createEffect(
    on(
      () => role(),
      (input) => {
        if (input) {
          setValues(roleForm, {
            name: input.data.name,
            description: input.data.description,
            permissions: input.data.permissions.map((val) => String(val.id)),
          });
        }
      }
    )
  );

  const handleSubmit: SubmitHandler<RoleForm> = async (values) => {
    const res = await updateRoleApi(param.id, values);

    actionMessage.showMessage({
      level: "success",
      message: res.data.message,
    });

    navigator("users/roles", { resolve: false });
  };

  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ອັບເດດບົດບາດ
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
              placeholder="ຂຽນຄຳອະທິບາຍ..."
            />
          )}
        </Field>

        <div class="relative">
          <label class={`mb-2 font-semibold text-gray-900 dark:text-white`}>
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
                          {(item) => (
                            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <Checkbox
                                label={item.label}
                                {...props}
                                value={item.value}
                                checked={field.value?.includes(item.value)}
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
        </div>
      </div>

      <div class="flex items-center">
        <Button type="submit" isLoading={roleForm.submitting} class="mr-3">
          ອັບເດດບົດບາດ
        </Button>
        <Button
          color="danger"
          outlined
          type="button"
          isLoading={roleForm.submitting}
          prefixIcon={<TrashIcon />}
          onClick={() => {
            actionConfirm.showConfirm({
              icon: () => (
                <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
              ),
              message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
              onConfirm: async () => {
                const res = await deleteRoleApi(param.id);

                actionMessage.showMessage({
                  level: "success",
                  message: res.data.message,
                });

                navigator("users/roles", { resolve: false });
              },
            });
          }}
        >
          ລຶບ
        </Button>
      </div>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={role.loading || permissions.loading}>
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
