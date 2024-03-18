import { Match, Switch } from "solid-js";
import MoonIcon from "../../../components/icons/MoonIcon";
import SunIcon from "../../../components/icons/SunIcon";
import { useTheme } from "../../../contexts/theme/ThemeContext";
import SidebarToggle from "../sidebar/SidebarToggle";
import ProfileMenu from "./ProfileMenu";
import TopbarLogo from "./TopbarLogo";

export default function () {
  const [theme, setTheme] = useTheme();

  return (
    <nav class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex justify-start items-center">
          <SidebarToggle />
          <TopbarLogo />
          {/* <TopbarGlobalSearch /> */}
        </div>

        <div class="flex items-center lg:order-2">
          {/* <TopbarGlobalSearchButton /> */}
          <button
            type="button"
            class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={() => {
              setTheme((prev) => (prev === "dark" ? "light" : "dark"));
            }}
          >
            <span class="sr-only">Theme</span>
            <Switch>
              <Match when={theme() === "dark"}>
                <SunIcon class="w-6 h-6" />
              </Match>
              <Match when={theme() === "light"}>
                <MoonIcon class="w-6 h-6" />
              </Match>
            </Switch>
          </button>
          <ProfileMenu />
        </div>
      </div>
    </nav>
  );
}
