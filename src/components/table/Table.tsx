import { Pagination } from "@ark-ui/solid";
import { For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { Dynamic } from "solid-js/web";
import { Transition } from "solid-transition-group";
import { fadeIn, fadeOut } from "../../utils/transition-animation";
import Select from "../forms/select/Select";
import LoadingIcon from "../icons/LoadingIcon";
import { TableProps, TableState } from "./Table.interface";
import TablePlaceholder from "./TablePlaceholder";
import Column from "./column/Column";

export default (props: TableProps) => {
  let tablePlaceholder: HTMLDivElement | undefined;

  const [table, setTable] = createStore<TableState>({
    paginate: { offset: 0, limit: 10 },
  });

  return (
    <div class="table-main">
      <Show when={props.header}>{(header) => header()}</Show>

      <div class="table-container">
        <Show when={props.value()}>
          {(val) =>
            val().data[props.responseField].length <= 0 ? (
              <TablePlaceholder ref={tablePlaceholder} />
            ) : undefined
          }
        </Show>

        <table class="table-content">
          <thead class="table-thead">
            <tr class="text-nowrap">
              <For each={props.children}>
                {(childProps) => <Dynamic component={Column} {...childProps} />}
              </For>
            </tr>
          </thead>

          <tbody class="text-nowrap">
            <Show
              when={props.value()}
              fallback={<tr style={{ height: "540px" }}></tr>}
            >
              {(value) => (
                <Show
                  when={value().data[props.responseField].length > 0}
                  fallback={<tr id="empty-row" class="h-[450px]"></tr>}
                >
                  <For each={value().data[props.responseField]}>
                    {(value) => (
                      <tr class="table-tbody text-nowrap">
                        <For each={props.children}>
                          {(childProps) => (
                            <td class="px-4 py-3">
                              {childProps.body
                                ? childProps.body(value)
                                : undefined}
                            </td>
                          )}
                        </For>
                      </tr>
                    )}
                  </For>
                </Show>
              )}
            </Show>
          </tbody>
        </table>
      </div>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={props.value.loading}>
          <div
            class={`absolute z-10 top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center`}
          >
            <div>
              <LoadingIcon class="animate-spin w-8 h-8" />
            </div>
          </div>
        </Show>
      </Transition>

      <Show when={props.value()}>
        {(value) => (
          <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400 flex items-center gap-x-1">
              ແຖວຕໍ່ໜ້າ
              <Select
                class="w-fit"
                items={[
                  { label: "10", value: "10" },
                  { label: "25", value: "25" },
                  { label: "50", value: "50" },
                  { label: "100", value: "100" },
                ]}
                value={["10"]}
                size="xs"
                contentClass="w-fit"
                onValueChange={({ value }) => {
                  setTable("paginate", (prev) => ({
                    ...prev,
                    limit: Number(value[0]),
                  }));

                  props.onChange(table);
                }}
              />
              <span class="font-semibold text-gray-900 dark:text-white">
                {table.paginate.offset + 1}-
                {value().data.total
                  ? Math.min(
                      table.paginate.offset + table.paginate.limit,
                      value().data.total
                    )
                  : ""}
              </span>
              ຂອງ
              <span class="font-semibold text-gray-900 dark:text-white">
                {value().data.total}
              </span>
            </span>

            <Pagination.Root
              class="inline-flex -space-x-px text-sm"
              count={value().data.total}
              pageSize={table.paginate.limit}
              onPageChange={({ pageSize, page }) => {
                setTable("paginate", () => ({
                  offset: (page - 1) * pageSize,
                  limit: pageSize,
                }));
                props.onChange(table);
              }}
            >
              <Pagination.PrevTrigger class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                ກັບຄືນ
              </Pagination.PrevTrigger>
              <Pagination.NextTrigger class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                ຕໍ່ໄປ
              </Pagination.NextTrigger>
            </Pagination.Root>
          </nav>
        )}
      </Show>
    </div>
  );
};
