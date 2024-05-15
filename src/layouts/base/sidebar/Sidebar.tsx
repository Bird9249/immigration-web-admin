import { A } from "@solidjs/router";
import { initDrawers } from "flowbite";
import {
  For,
  JSXElement,
  Match,
  Switch,
  createEffect,
  onMount,
} from "solid-js";
import { createStore } from "solid-js/store";
import { PermissionGroup } from "../../../common/enum/permission.enum";
import checkPermissionGroup from "../../../common/utils/check-permission-group";
import Building from "../../../components/icons/Building";
import BullhornIcon from "../../../components/icons/BullhornIcon";
import CheckpointIcon from "../../../components/icons/CheckpointIcon";
import FilePenIcon from "../../../components/icons/FilePenIcon";
import HomeIcon from "../../../components/icons/HomeIcon";
import Message from "../../../components/icons/Message";
import UserIcon from "../../../components/icons/UserIcon";
import VisaIcon from "../../../components/icons/VisaIcon";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import SidebarMenu from "./SidebarMenu";

interface SidebarMenuType {
  icon: JSXElement;
  href: string;
  label: string;
  subMenus?: SidebarSubMenuType;
}

interface SidebarSubMenuType {
  menus: { href: string; label: string }[];
  isOpen: boolean;
}

export default function () {
  const auth = useAuth();

  const [sidebarMenus, setSidebarMenus] = createStore<{
    menus: SidebarMenuType[];
  }>({
    menus: [],
  });

  createEffect(() => {
    const preparedMenus: SidebarMenuType[] = [];

    if (!auth.roles.includes("admin-hotel") || !auth.hotel_id) {
      preparedMenus.push({
        icon: <HomeIcon />,
        href: "/dashboard",
        label: "ໜ້າຫຼັກ",
      });
    }

    if (checkPermissionGroup(PermissionGroup.Registration, auth)) {
      preparedMenus.push({
        icon: <FilePenIcon />,
        href: "/registrations",
        label: "ການລົງທະບຽນ",
        subMenus: {
          menus: [
            { href: "/registrations/arrival", label: "ລົງທະບຽນເຂົ້າເມືອງ" },
            { href: "/registrations/departure", label: "ລົງທະບຽນອອກເມືອງ" },
            { href: "/registrations/number", label: "ຈຳນວນການລົງທະບຽນ" },
          ],
          isOpen: false,
        },
      });
    }

    if (checkPermissionGroup(PermissionGroup.AccommodationRequest, auth)) {
      preparedMenus.push({
        icon: <HomeIcon />,
        href: "/accommodation-request",
        label: "ການຮ້ອງຂໍທີ່ພັກ",
      });
    }

    if (checkPermissionGroup(PermissionGroup.VisaCategory, auth)) {
      preparedMenus.push({
        icon: <VisaIcon />,
        href: "/visa-category",
        label: "ປະເພດວີຊາ",
      });
    }

    if (checkPermissionGroup(PermissionGroup.Banner, auth)) {
      preparedMenus.push({
        icon: <BullhornIcon />,
        href: "/banner",
        label: "ຈັດການໂຄສະນາ",
        subMenus: {
          menus: [
            { href: "/banner/list", label: "ຈັດການປ້າຍ" },
            { href: "/banner/popup", label: "ຈັດການ popup" },
          ],
          isOpen: false,
        },
      });
    }
    if (checkPermissionGroup(PermissionGroup.Checkpoint, auth)) {
      preparedMenus.push({
        icon: <CheckpointIcon />,
        href: "/checkpoint",
        label: "ຈັດການດ່ານ",
        subMenus: {
          menus: [
            { href: "/checkpoint/category", label: "ປະເພດດ່ານ" },
            { href: "/checkpoint/province", label: "ຈັດການແຂວງ" },
          ],
          isOpen: false,
        },
      });
    }

    if (checkPermissionGroup(PermissionGroup.Feedback, auth)) {
      preparedMenus.push({
        icon: <Message />,
        href: "/feedback",
        label: "ຄຳຕິຊົມ",
      });
    }

    if (checkPermissionGroup(PermissionGroup.User, auth)) {
      preparedMenus.push({
        icon: <UserIcon />,
        href: "/users",
        label: "ຈັດການຜູ້ໃຊ້",
        subMenus: {
          menus: [
            { href: "/users/list", label: "ຜູ້ໃຊ້" },
            { href: "/users/roles", label: "ບົດບາດ" },
            { href: "/users/permissions", label: "ການອະນຸຍາດ" },
          ],
          isOpen: false,
        },
      });
    }

    if (checkPermissionGroup(PermissionGroup.Hotel, auth)) {
      preparedMenus.push({
        icon: <Building />,
        href: "/hotels",
        label: "ຈັດການໂຮງແຮມ",
      });
    }

    if (auth.roles.includes("admin-hotel") && auth.hotel_id) {
      preparedMenus.push({
        icon: <HomeIcon />,
        href: "/admin-hotels",
        label: "ໜ້າຫຼັກ",
      });
    }

    setSidebarMenus("menus", (prev) => [...prev, ...preparedMenus]);
  });

  onMount(() => {
    initDrawers();
  });

  return (
    <aside
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <ul class="space-y-2">
          <For each={sidebarMenus.menus}>
            {({ subMenus, href, icon, label }, idx) => (
              <Switch>
                <Match when={!subMenus}>
                  <li>
                    <A
                      href={href}
                      class="flex items-center p-2 text-base font-medium rounded-lg"
                      activeClass="sidebar-active"
                      inactiveClass="sidebar-inactive"
                    >
                      <span class="w-6 h-6 transition">{icon}</span>
                      <span class="ml-3">{label}</span>
                    </A>
                  </li>
                </Match>

                <Match when={subMenus}>
                  <SidebarMenu
                    path={href}
                    menus={(subMenus as SidebarSubMenuType).menus}
                    isOpen={(subMenus as SidebarSubMenuType).isOpen}
                    icon={icon}
                    label={label}
                    onChange={() => {
                      setSidebarMenus(
                        "menus",
                        idx(),
                        "subMenus",
                        (prevList) => ({
                          ...prevList,
                          isOpen: !prevList?.isOpen,
                        })
                      );

                      const sidebarMenuIdx = sidebarMenus.menus.findIndex(
                        (v, index) => index !== idx() && v.subMenus?.isOpen
                      );

                      if (sidebarMenuIdx > 0) {
                        setSidebarMenus(
                          "menus",
                          sidebarMenuIdx,
                          "subMenus",
                          (prevList) => ({
                            ...prevList,
                            isOpen: !prevList?.isOpen,
                          })
                        );
                      }
                    }}
                  />
                </Match>
              </Switch>
            )}
          </For>
        </ul>
      </div>
    </aside>
  );
}
