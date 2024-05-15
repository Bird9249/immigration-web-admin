import { useNavigate } from "@solidjs/router";
import axios, { AxiosError, AxiosStatic } from "axios";
import {
  ParentProps,
  Signal,
  createContext,
  createEffect,
  createSignal,
  on,
  useContext,
} from "solid-js";
import { useMessage } from "../message/MessageContext";

type AxiosContextValue = {
  axios: AxiosStatic;
  error: Signal<{ message: string; level: "warn" | "danger" } | undefined>;
};

const AxiosContext = createContext<AxiosContextValue>({
  axios,
  error: createSignal<
    { message: string; level: "warn" | "danger" } | undefined
  >(),
});

export const AxiosProvider = (props: ParentProps<{}>) => {
  const [, actions] = useMessage();
  const navigator = useNavigate();
  const [error, setError] = createSignal<
    { message: string; level: "warn" | "danger" } | undefined
  >();

  const token = localStorage.getItem("token");
  const auth = token ? `Bearer ${token}` : "";

  axios.defaults.headers.common.Authorization = auth;
  axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

  axios.interceptors.response.use(
    (res) => res,
    (err: AxiosError<{ message: string; errors: string[] }>) => {
      if (err.response) {
        const checkErrorMessage = err.response.data.message
          ? err.response.data.message
          : err.message;

        if (err.response.status >= 400 && err.response.status < 500) {
          if (err.response.status === 401) navigator("/login");

          setError(() => ({ message: checkErrorMessage, level: "warn" }));
        } else if (err.response.status >= 500) {
          setError(() => ({ message: checkErrorMessage, level: "danger" }));
        }
      }
    }
  );

  createEffect(
    on(error, (err) => {
      if (err) {
        setTimeout(() => {
          setError(undefined);
        }, 5000);
      } else {
        axios.interceptors.response.use(
          (res) => res,
          (err: AxiosError<{ message: string; errors: string[] }>) => {
            if (err.response) {
              const checkErrorMessage = err.response.data.message
                ? err.response.data.message
                : err.message;

              if (err.response.status >= 400 && err.response.status < 500) {
                if (err.response.status === 401) navigator("/login");

                setError(() => ({ message: checkErrorMessage, level: "warn" }));
              } else if (err.response.status >= 500) {
                setError(() => ({
                  message: checkErrorMessage,
                  level: "danger",
                }));
              }
            }
          }
        );
      }
    })
  );

  return (
    <AxiosContext.Provider value={{ axios, error: [error, setError] }}>
      {props.children}
    </AxiosContext.Provider>
  );
};

export function useAxios() {
  return useContext(AxiosContext);
}
