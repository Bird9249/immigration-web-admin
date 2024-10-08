import { createForm, valiForm } from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { AxiosError } from "axios";
import { createSignal, Show } from "solid-js";
import Button from "../../../components/button/Button";
import InputText from "../../../components/forms/input-text/InputText";
import PasswordInput from "../../../components/forms/password-input/PasswordInput";
import InfoCircleIcon from "../../../components/icons/InfoCircleIcon";
import { useMessage } from "../../../contexts/message/MessageContext";
import loginApi from "./login.api";
import { LoginForm, LoginSchema } from "./login.schema";

export default () => {
  const [, actions] = useMessage();
  const navigate = useNavigate();
  const [error, setError] = createSignal<string>("");

  const [loginForm, { Form, Field }] = createForm<LoginForm>({
    validate: valiForm(LoginSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  async function handlerSubmit(values: LoginForm) {
    try {
      await loginApi(values);
      actions.showMessage({
        level: "success",
        message: "ເຂົ້າສູ່ລະບົບສຳເລັດແລ້ວ",
      });

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  }

  return (
    <>
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        ເຂົ້າສູ່ລະບົບບັນຊີຂອງທ່ານ
      </h1>

      <Show when={error()}>
        <div
          class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <InfoCircleIcon class="flex-shrink-0 w-6 h-6" />
          <span class="sr-only">Info</span>
          <div class="ms-3 text-sm font-medium">{error()}</div>
        </div>
      </Show>

      <Form class="space-y-4 md:space-y-6" onSubmit={handlerSubmit}>
        <Field name="email">
          {(field, props) => (
            <InputText
              {...props}
              label="ອີເມວຂອງທ່ານ"
              required
              value={field.value}
              error={field.error}
              placeholder="name@company.com"
            />
          )}
        </Field>
        <Field name="password">
          {(field, props) => (
            <PasswordInput
              {...props}
              label="ລະຫັດຜ່ານ"
              required
              value={field.value}
              error={field.error}
              placeholder="••••••••"
            />
          )}
        </Field>
        <Button type="submit" class="w-full" isLoading={loginForm.submitting}>
          ເຂົ້າ​ສູ່​ລະ​ບົບ
        </Button>
      </Form>
    </>
  );
};
