import { useNavigate } from "@solidjs/router";
import axios, { AxiosError, AxiosStatic } from "axios";
import { ParentProps, createContext, useContext } from "solid-js";
import { useMessage } from "../message/MessageContext";

type AxiosContextValue = { axios: AxiosStatic };

const AxiosContext = createContext<AxiosContextValue>({ axios });

export const AxiosProvider = (
  props: ParentProps<{
    onError: (message: string, errors: string[]) => void;
  }>
) => {
  const [, actions] = useMessage();
  const navigator = useNavigate();

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

          actions.showMessage({
            level: "warning",
            message: checkErrorMessage,
          });
        } else if (err.response.status >= 500) {
          actions.showMessage({
            level: "danger",
            message: checkErrorMessage,
          });
        }

        props.onError(checkErrorMessage, []);
      }
    }
  );

  return (
    <AxiosContext.Provider value={{ axios }}>
      {props.children}
    </AxiosContext.Provider>
  );
};

export function useAxios() {
  return useContext(AxiosContext);
}
