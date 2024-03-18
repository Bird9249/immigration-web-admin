import { Menu, MenuRootProps } from "@ark-ui/solid";
import { For, JSXElement, ParentProps } from "solid-js";
import { Portal } from "solid-js/web";

interface DropdownProps extends ParentProps<MenuRootProps> {
  triggerEl: JSXElement;
  menus: { label: string; onClick: () => void }[][];
}

export default (props: DropdownProps) => {
  return (
    <Menu.Root {...props}>
      <Menu.Trigger>{props.triggerEl}</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content class="dropdown">
            <For each={props.menus}>
              {(menus) => (
                <ul class="dropdown-content">
                  <For each={menus}>
                    {(menu) => (
                      <li>
                        <Menu.Item
                          id={menu.label}
                          class="dropdown-item"
                          onClick={() => menu.onClick()}
                        >
                          {menu.label}
                        </Menu.Item>
                      </li>
                    )}
                  </For>
                </ul>
              )}
            </For>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
