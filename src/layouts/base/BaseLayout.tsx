import { RouteSectionProps } from "@solidjs/router";
import { For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { Transition } from "solid-transition-group";
import CloseIcon from "../../components/icons/CloseIcon";
import InfoCircleIcon from "../../components/icons/InfoCircleIcon";
import { AuthProvider } from "../../contexts/authentication/AuthContext";
import { AxiosProvider } from "../../contexts/axios/AxiosContext";
import { ThemeProvider } from "../../contexts/theme/ThemeContext";
import { fadeIn, fadeOut } from "../../utils/transition-animation";
import Topbar from "./header/Topbar";
import Sidebar from "./sidebar/Sidebar";

export default (props: RouteSectionProps) => {
  const [error, setError] = createStore<{
    message?: string;
    errors?: string[];
  }>();

  return (
    <AxiosProvider
      onError={(message, errors) => {
        setError("message", message);
        setError("errors", errors);
      }}
    >
      <ThemeProvider>
        <AuthProvider>
          <div class="antialiased bg-gray-50 dark:bg-gray-900 transition-all">
            <Topbar />
            <Sidebar />
            <main class="p-4 md:ml-64 h-auto min-h-screen pt-20">
              <Transition onEnter={fadeIn} onExit={fadeOut}>
                <Show when={error.message}>
                  <div
                    class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <InfoCircleIcon class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" />
                    <span class="sr-only">Danger</span>
                    <div>
                      <span class="font-medium">{error.message}</span>
                      <Show when={error.errors}>
                        {(errors) => (
                          <ul class="mt-1.5 list-disc list-inside">
                            <For each={errors()}>{(err) => <li>{err}</li>}</For>
                          </ul>
                        )}
                      </Show>
                    </div>
                    <button
                      type="button"
                      class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                      aria-label="Close"
                      onClick={() => {
                        setError("message", "");
                        setError("errors", []);
                      }}
                    >
                      <span class="sr-only">Close</span>
                      <CloseIcon class="w-6 h-6" />
                    </button>
                  </div>
                </Show>
              </Transition>

              <div class="mx-auto max-w-7xl">{props.children}</div>
            </main>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </AxiosProvider>
  );
};
