import { Menu } from "@ark-ui/solid";
import { A, useNavigate } from "@solidjs/router";
import Avatar from "../../../components/avatar/Avatar";
import ArrowIcon from "../../../components/icons/ArrowIcon";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import logoutApi from "../../../contexts/authentication/logout.api";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";

export default function () {
  const auth = useAuth();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const navigator = useNavigate();

  function logout() {
    actionConfirm.showConfirm({
      icon: () => (
        <ArrowIcon
          iconDirection="right-bracket"
          class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
        />
      ),
      message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການອອກຈາກລະບົບ?",
      onConfirm: async () => {
        const res = await logoutApi();

        localStorage.removeItem("token");

        actionMessage.showMessage({
          level: "success",
          message: res.data.message,
        });

        navigator("/login", { resolve: false });
      },
    });
  }

  return (
    <Menu.Root>
      <Menu.Trigger class="flex mx-3 text-sm pe-2 dark:bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition">
        <span class="sr-only">Open user menu</span>
        <Avatar
          src={
            auth.profile.image
              ? `${
                  (import.meta.env.VITE_BASE_API_URL as string) +
                  auth.profile.image
                }`
              : undefined
          }
          alt="User Profile"
          size="sm"
          text={auth.profile.first_name}
        />
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content class="z-50 my-4 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl">
          <div class="py-3 px-4">
            <span class="block text-sm font-semibold text-gray-900 dark:text-white">
              {auth.profile.first_name} {auth.profile.last_name}
            </span>
            <span class="block text-sm text-gray-900 truncate dark:text-white">
              {auth.email}
            </span>
          </div>

          <ul
            class="py-1 text-gray-700 dark:text-gray-300"
            aria-labelledby="dropdown"
          >
            <li>
              <A
                href={`users/detail/${auth.id}`}
                class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                ໂປຣໄຟລ໌ຂອງຂ້ອຍ
              </A>
            </li>
          </ul>

          <ul
            class="py-1 text-gray-700 dark:text-gray-300"
            aria-labelledby="dropdown"
          >
            <li>
              <a
                href="#"
                class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600  dark:hover:text-white"
                onClick={logout}
              >
                ອອກ​ຈາກ​ລະ​ບົບ
              </a>
            </li>
          </ul>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
