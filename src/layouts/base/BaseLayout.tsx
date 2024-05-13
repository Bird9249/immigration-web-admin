import { RouteSectionProps } from "@solidjs/router";
import { AuthProvider } from "../../contexts/authentication/AuthContext";
import { AxiosProvider } from "../../contexts/axios/AxiosContext";
import { ThemeProvider } from "../../contexts/theme/ThemeContext";
import Topbar from "./header/Topbar";
import Sidebar from "./sidebar/Sidebar";

export default (props: RouteSectionProps) => {
  return (
    <AxiosProvider>
      <ThemeProvider>
        <AuthProvider>
          <div class="antialiased bg-gray-50 dark:bg-gray-900 transition-all">
            <Topbar />
            <Sidebar />
            <main class="p-4 md:ml-64 h-auto min-h-screen pt-20">
              <div class="mx-auto max-w-7xl">{props.children}</div>
            </main>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </AxiosProvider>
  );
};
