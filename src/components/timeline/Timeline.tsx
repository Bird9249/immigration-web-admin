import { For, JSXElement } from "solid-js";

type PropsItem = {
  time: string;
  title: string;
  content: JSXElement;
};

type Props = {
  items: PropsItem[];
};

export default ({ items }: Props) => {
  return (
    <ol class="relative border-s border-gray-200 dark:border-gray-700">
      <For each={items}>
        {(item) => (
          <li class="mb-10 ms-4">
            <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {item.time}
            </time>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {item.title}
            </h3>

            {item.content}
          </li>
        )}
      </For>
    </ol>
  );
};
