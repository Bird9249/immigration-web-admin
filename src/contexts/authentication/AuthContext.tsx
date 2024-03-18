import {
  ParentComponent,
  ParentProps,
  Show,
  createContext,
  createResource,
  useContext,
} from "solid-js";
import LoadingIcon from "../../components/icons/LoadingIcon";
import getAuthApi, { AuthResponseType } from "./get-auth.api";

const AuthContext = createContext<AuthResponseType>(undefined);

export const AuthProvider: ParentComponent = (props: ParentProps) => {
  const [auth] = createResource(getAuthApi);

  return (
    <Show
      when={auth()}
      fallback={
        <div class="w-screen h-screen text-gray-900 bg-gray-50 dark:text-white dark:bg-gray-900 ">
          <div class="flex justify-center items-center h-full">
            <div class="flex flex-col justify-center items-center">
              <LoadingIcon class="animate-spin w-8 h-8 mb-3" />
              ກຳລັງໂຫຼດ...
            </div>
          </div>
        </div>
      }
    >
      {(data) => (
        <AuthContext.Provider value={data().data}>
          {props.children}
        </AuthContext.Provider>
      )}
    </Show>
  );
};

export function useAuth() {
  return useContext(AuthContext) as AuthResponseType;
}
