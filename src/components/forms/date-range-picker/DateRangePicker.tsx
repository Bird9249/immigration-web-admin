import { DatePicker } from "@ark-ui/solid";
import { FormStore, setValue } from "@modular-forms/solid";
import { Portal, Show } from "solid-js/web";

type DateRangePickerProps = {
  name: string;
  label: [string, string];
  placeholder?: [string, string];
  value: [string, string] | undefined;
  error: string;
  required?: boolean;
  form: FormStore<any, any>;
  formClass?: string;
};

export default (props: DateRangePickerProps) => {
  const formatDate = (month: number, day: number, year: number) => {
    const monthStr: string = month < 10 ? `0${month}` : `${month}`;
    const dayStr: string = day < 10 ? `0${day}` : `${day}`;
    return `${dayStr}/${monthStr}/${year}`;
  };

  return (
    <DatePicker.Root
      class="w-full"
      selectionMode="range"
      value={props.value}
      onValueChange={({ valueAsString }) => {
        setValue(props.form, props.name, valueAsString);
      }}
      format={({ month, day, year }) => formatDate(month, day, year)}
    >
      <DatePicker.Control class={props.formClass}>
        <div>
          <DatePicker.Label
            class={`block mb-2 text-sm font-medium  ${
              props.error ? "text-red-500" : "text-gray-900"
            } dark:text-white`}
          >
            {props.label[0]}{" "}
            {props.required && <span class="text-red-600">*</span>}
          </DatePicker.Label>
          <div class="relative w-full">
            <DatePicker.Input
              index={0}
              type="text"
              id={props.name}
              aria-invalid={!!props.error}
              aria-errormessage={`${props.name}-error`}
              required={false}
              class=" border rounded-lg text-sm transition block w-full p-2.5"
              classList={{
                "bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500":
                  !props.error,
                "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500":
                  !!props.error,
              }}
              placeholder={`${
                props.placeholder ? props.placeholder[0] : ""
              } (ວ/ດ/ປ)`}
            />
            <DatePicker.Trigger class="text-white transition absolute end-0 inset-y-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </DatePicker.Trigger>
          </div>
          <Show when={props.error}>
            <p class="mt-2 text-sm text-red-500">{props.error}</p>
          </Show>
        </div>

        <div>
          <DatePicker.Label
            class={`block mb-2 text-sm font-medium  ${
              props.error ? "text-red-500" : "text-gray-900"
            } dark:text-white`}
          >
            {props.label[1]}{" "}
            {props.required && <span class="text-red-600">*</span>}
          </DatePicker.Label>
          <div class="relative w-full">
            <DatePicker.Input
              index={1}
              type="text"
              id={props.name}
              aria-invalid={!!props.error}
              aria-errormessage={`${props.name}-error`}
              required={false}
              class="border transition text-sm rounded-lg block w-full p-2.5"
              classList={{
                "bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500":
                  !props.error,
                "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500":
                  !!props.error,
              }}
              placeholder={`${
                props.placeholder ? props.placeholder[0] : ""
              } (ວ/ດ/ປ)`}
            />
            <DatePicker.Trigger class="text-white transition absolute end-0 inset-y-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </DatePicker.Trigger>
          </div>
          <Show when={props.error}>
            <p class="mt-2 text-sm text-red-500">{props.error}</p>
          </Show>
        </div>
      </DatePicker.Control>

      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              {(api) => (
                <>
                  <DatePicker.ViewControl class="flex justify-between mb-2">
                    <DatePicker.PrevTrigger class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 prev-btn">
                      <svg
                        class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 5H1m0 0 4 4M1 5l4-4"
                        ></path>
                      </svg>
                    </DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger class="text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch">
                      <DatePicker.RangeText />
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 next-btn">
                      <svg
                        class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        ></path>
                      </svg>
                    </DatePicker.NextTrigger>
                  </DatePicker.ViewControl>

                  <DatePicker.Table class="p-1 grid">
                    <DatePicker.TableHead>
                      <DatePicker.TableRow class="grid grid-cols-7 mb-1">
                        {api().weekDays.map((weekDay) => (
                          <DatePicker.TableHeader class="text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                            {weekDay.short}
                          </DatePicker.TableHeader>
                        ))}
                      </DatePicker.TableRow>
                    </DatePicker.TableHead>

                    <DatePicker.TableBody>
                      {api().weeks.map((week) => (
                        <DatePicker.TableRow class="w-64 grid grid-cols-7">
                          {week.map((day) => (
                            <DatePicker.TableCell value={day}>
                              <DatePicker.TableCellTrigger>
                                {day.day}
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          ))}
                        </DatePicker.TableRow>
                      ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>
              )}
            </DatePicker.View>
            <DatePicker.View view="month">
              {(api) => (
                <>
                  <DatePicker.ViewControl class="flex justify-between mb-2">
                    <DatePicker.PrevTrigger class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 prev-btn">
                      <svg
                        class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 5H1m0 0 4 4M1 5l4-4"
                        ></path>
                      </svg>
                    </DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger class="text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch">
                      <DatePicker.RangeText />
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 next-btn">
                      <svg
                        class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        ></path>
                      </svg>
                    </DatePicker.NextTrigger>
                  </DatePicker.ViewControl>

                  <DatePicker.Table class="p-1">
                    <DatePicker.TableBody>
                      {api()
                        .getMonthsGrid({ columns: 4, format: "short" })
                        .map((months) => (
                          <DatePicker.TableRow class="w-64 grid grid-cols-4">
                            {months.map((month) => (
                              <DatePicker.TableCell value={month.value}>
                                <DatePicker.TableCellTrigger>
                                  {month.label}
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            ))}
                          </DatePicker.TableRow>
                        ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>
              )}
            </DatePicker.View>
            <DatePicker.View view="year">
              {(api) => (
                <>
                  <DatePicker.ViewControl class="flex justify-between mb-2">
                    <DatePicker.PrevTrigger class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 prev-btn">
                      <svg
                        class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 5H1m0 0 4 4M1 5l4-4"
                        ></path>
                      </svg>
                    </DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger class="text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch">
                      <DatePicker.RangeText />
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 next-btn">
                      <svg
                        class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        ></path>
                      </svg>
                    </DatePicker.NextTrigger>
                  </DatePicker.ViewControl>

                  <DatePicker.Table class="p-1">
                    <DatePicker.TableBody>
                      {api()
                        .getYearsGrid({ columns: 4 })
                        .map((years) => (
                          <DatePicker.TableRow class="w-64 grid grid-cols-4">
                            {years.map((year) => (
                              <DatePicker.TableCell value={year.value}>
                                <DatePicker.TableCellTrigger>
                                  {year.label}
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            ))}
                          </DatePicker.TableRow>
                        ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>
              )}
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  );
};
