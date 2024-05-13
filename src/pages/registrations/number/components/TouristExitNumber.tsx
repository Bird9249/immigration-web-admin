import { SubmitHandler } from "@modular-forms/solid";
import { createResource, createSignal, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import LoadingIcon from "../../../../components/icons/LoadingIcon";
import MinusIcon from "../../../../components/icons/MinusIcon";
import PlusIcon from "../../../../components/icons/PlusIcon";
import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { fadeIn, fadeOut } from "../../../../utils/transition-animation";
import touristExitActionApi from "../apis/tourist-exit-action.api";
import touristExitNumberApi from "../apis/tourist-exit-number.api";
import { NumberSchemaType } from "../schemas/number.schema";
import NumberForm from "./NumberForm";

export default () => {
  const {
    error: [error, setError],
  } = useAxios();

  const [formOpen, setFormOpen] = createSignal<boolean>(false);
  let action: "increment" | "decrement" = "increment";

  const [data, { refetch }] = createResource(touristExitNumberApi);

  const submit: SubmitHandler<NumberSchemaType> = async (values) => {
    const res = await touristExitActionApi(values, action);

    if (res.status === 201) {
      setFormOpen(false);
      setError(undefined);
      await refetch();
    }
  };

  return (
    <>
      <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4 relative">
        <h2 class="text-2xl font-bold mb-8 text-center dark:text-white">
          ການລົງທະບຽນອອກຂອງນັກທອງທ່ຽວ
        </h2>

        <dl class="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
          <div class="flex flex-col items-center justify-center">
            <dt class="mb-2 text-2xl md:text-3xl font-extrabold">
              {data() ? data()?.data.per_year.toLocaleString() : "..."}
            </dt>
            <dd class="font-light text-gray-500 dark:text-gray-400">
              ເຂົ້າມື້ນີ້
            </dd>
          </div>
          <div class="flex flex-col items-center justify-center">
            <dt class="mb-2 text-2xl md:text-3xl font-extrabold">
              {data() ? data()?.data.per_year.toLocaleString() : "..."}
            </dt>
            <dd class="font-light text-gray-500 dark:text-gray-400">
              ເຂົ້າ 30 ມື້ກ່ອນ
            </dd>
          </div>
          <div class="flex flex-col items-center justify-center">
            <dt class="mb-2 text-2xl md:text-3xl font-extrabold">
              {data() ? data()?.data.per_year.toLocaleString() : "..."}
            </dt>
            <dd class="font-light text-gray-500 dark:text-gray-400">
              ເຂົ້າ 1 ປີກ່ອນ
            </dd>
          </div>
        </dl>

        <div class="absolute top-2 right-2 flex gap-1">
          <button
            onClick={() => {
              setFormOpen(true);
              action = "decrement";
            }}
            type="button"
            class="transition text-red-600 bg-red-200 hover:text-red-900 rounded-lg text-sm size-6 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
          >
            <MinusIcon class="size-5" />
            <span class="sr-only">Minus</span>
          </button>
          <button
            onClick={() => {
              setFormOpen(true);
              action = "increment";
            }}
            type="button"
            class="transition text-primary-600 bg-primary-200 hover:text-primary-900 rounded-lg text-sm size-6 ms-auto inline-flex justify-center items-center dark:hover:bg-primary-600 dark:hover:text-white"
          >
            <PlusIcon class="size-5" />
            <span class="sr-only">Plus</span>
          </button>
        </div>

        <Transition onEnter={fadeIn} onExit={fadeOut}>
          <Show when={data.loading}>
            <div
              class={`absolute z-10 top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center`}
            >
              <div>
                <LoadingIcon class="animate-spin w-8 h-8" />
              </div>
            </div>
          </Show>
        </Transition>
      </div>

      <NumberForm
        open={[formOpen, setFormOpen]}
        onOpenChange={(open) => {
          setFormOpen(open);
        }}
        submit={submit}
      />
    </>
  );
};
