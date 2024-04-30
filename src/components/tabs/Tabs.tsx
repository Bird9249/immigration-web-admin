import { Tabs } from "@ark-ui/solid";
import { createSignal, For, JSXElement, Show } from "solid-js";

export type TabsItems = { key: string; label: string; alert?: boolean }[];
export type TabsContents = { key: string; content: JSXElement }[];

type TabsProps = {
    items: TabsItems;
    contents: TabsContents;
    onValueChange?: (value: string) => void;
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
                if (props.onValueChange) props.onValueChange(e.value);
            }}
        >
            <Tabs.List class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul class="flex flex-wrap -mb-px">
                    <For each={props.items}>
                        {(item) => (
                            <li class="me-2 ">
                                <Tabs.Trigger
                                    class="inline-block p-4 border-b-2 rounded-t-lg transition relative"
                                    value={item.key}
                                    classList={{
                                        "hover:text-gray-600 border-transparent hover:border-gray-300 dark:hover:text-gray-300":
                                            item.key !== value(),
                                        "text-primary-600 border-primary-600 dark:text-primary-500 dark:border-primary-500":
                                            item.key === value(),
                                    }}
                                >
                                    {item.label}
                                    <Show when={item.alert}>
                                        <span class="absolute flex size-3 top-2 right-1">
                                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span class="relative inline-flex rounded-full size-3 bg-red-500"></span>
                                        </span>
                                    </Show>
                                </Tabs.Trigger>
                            </li>
                        )}
                    </For>
                </ul>
            </Tabs.List>
            <For each={props.contents}>
                {(item) => <Tabs.Content value={item.key}>{item.content}</Tabs.Content>}
            </For>
        </Tabs.Root>
    );
};