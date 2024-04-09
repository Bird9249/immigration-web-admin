import { Tabs } from "@ark-ui/solid";
import { createSignal, For, JSXElement } from "solid-js";

type TabsProps = {
  items: { key: string; label: string; content: JSXElement }[];
};

export default (props: TabsProps) => {
  const [value, setValue] = createSignal<string | null>(props.items[0].key);

  return (
    <Tabs.Root
      value={value()}
      lazyMount
      unmountOnExit
      onValueChange={(e) => {
        setValue(e.value);
      }}
    >
      <Tabs.List class="mb-6 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px">
          <For each={props.items}>
            {(item) => (
              <li class="me-2 ">
                <Tabs.Trigger
                  class="inline-block p-4 border-b-2 rounded-t-lg transition"
                  value={item.key}
                  classList={{
                    "hover:text-gray-600 border-transparent hover:border-gray-300 dark:hover:text-gray-300":
                      item.key !== value(),
                    "text-primary-600 border-primary-600 dark:text-primary-500 dark:border-primary-500":
                      item.key === value(),
                  }}
                >
                  {item.label}
                </Tabs.Trigger>
              </li>
            )}
          </For>
        </ul>
      </Tabs.List>
      <For each={props.items}>
        {(item) => <Tabs.Content value={item.key}>{item.content}</Tabs.Content>}
      </For>
    </Tabs.Root>
  );
};
