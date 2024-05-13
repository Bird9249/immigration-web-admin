import { useParams } from "@solidjs/router";
import { format } from "date-fns";
import { createResource, createSignal, Match, Show, Switch } from "solid-js";
import { Transition } from "solid-transition-group";
import Button from "../../../components/button/Button";
import CheckIcon from "../../../components/icons/CheckIcon";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import getDepartureRegistrationDetailApi from "./api/get-departure-registration-detail.api";
import verifyDepartureCodeApi from "./api/verify-departure-code.api";

export default () => {
  const param = useParams();
  const [, actionMessage] = useMessage();
  const [, actionConfirm] = useConfirm();

  const [id] = createSignal<string>(param.id);

  const [arrival, { refetch, mutate }] = createResource(
    id,
    getDepartureRegistrationDetailApi
  );

  async function verify() {
    actionConfirm.showConfirm({
      icon: () => (
        <CheckIcon
          iconDirection="badge"
          class="text-primary-600 dark:text-primary-500 w-11 h-11 mb-3.5 mx-auto"
        />
      ),
      message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການຢືນຢັນຂໍ້ມູນການລົງທະບຽນນີ້?",
      onConfirm: async () => {
        const res = await verifyDepartureCodeApi(id());
        mutate(undefined);
        await refetch();
        actionMessage.showMessage({
          level: "success",
          message: res.data.message,
        });
      },
      confirmColor: "primary",
    });
  }

  return (
    <div class="relative">
      <div class="mb-3 border-b">
        <h2 class="mb-4 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">
          ຂໍ້ມູນການອອກເມືອງ
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2">
          <dl>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ຈຸດອອກ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(arrival) => arrival().data.departure_name}
              </Show>
            </dd>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ທີ່ຢູ່ອາໄສຄັ້ງສຸດທ້າຍກ່ອນອອກຈາກ ສປປ ລາວ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(arrival) => arrival().data.last_leaving}
              </Show>
            </dd>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ບັນຊີດໍາ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(arrival) => (
                  <div class="flex items-center">
                    <div
                      class="border rounded-full size-3 mr-2"
                      classList={{
                        "bg-green-500":
                          arrival().data.black_list === "available",
                        "bg-red-500":
                          arrival().data.black_list === "unavailable",
                      }}
                    ></div>
                    {arrival().data.black_list === "available"
                      ? "ບໍ່ມີໃນບັນຊີດຳ"
                      : "ມີໃນບັນຊີດຳ"}
                  </div>
                )}
              </Show>
            </dd>
          </dl>

          <dl>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ລະຫັດຢືນຢັນເຂົ້າເມືອງ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(arrival) =>
                  arrival().data.verification_code ? (
                    <span class="font-medium text-gray-900">
                      {(arrival().data.verification_code as string)
                        .split("")
                        .join(" ")}
                    </span>
                  ) : (
                    "ລົງທະບຽນບໍ່ສຳເລັດ"
                  )
                }
              </Show>
            </dd>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ຢືນຢັນໃນວັນທີ່
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(item) =>
                  item().data.verified_at ? (
                    <span class="text-green-500 font-medium flex gap-1 items-center">
                      <CheckIcon iconDirection="circle" class="size-4" />{" "}
                      {format(
                        item().data.verified_at as string,
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                    </span>
                  ) : (
                    <>
                      ຍັງບໍ່ມີການຢືນຢັນ
                      <Button
                        color="primary"
                        size="sm"
                        class="ms-2"
                        prefixIcon={<CheckIcon iconDirection="badge" />}
                        onClick={async () => {
                          await verify();
                        }}
                      >
                        ຢືນຢັນ
                      </Button>
                    </>
                  )
                }
              </Show>
            </dd>
          </dl>
        </div>
      </div>

      <div class="mb-3 border-b">
        <h2 class="mb-4 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">
          ຂໍ້ມູນສ່ວນຕົວ
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2">
          <dl>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ຊື່ ແລະ ນາມສະກຸນ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(arrival) =>
                  arrival().data.personal_information.name +
                  " " +
                  arrival().data.personal_information.family_name
                }
              </Show>
            </dd>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ວັນເດືອນປີເກີດ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(arrival) =>
                  format(
                    arrival().data.personal_information.date_of_birth,
                    "dd/MM/yyyy"
                  )
                }
              </Show>
            </dd>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ສະຖານທີ່ເກີດ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(arrival) =>
                  arrival().data.personal_information.place_of_birth
                }
              </Show>
            </dd>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ເບີໂທ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(arrival) => arrival().data.personal_information.phone_number}
              </Show>
            </dd>
          </dl>

          <dl>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ເພດ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(arrival) => (
                  <Switch>
                    <Match
                      when={
                        arrival().data.personal_information.gender === "male"
                      }
                    >
                      ຊາຍ
                    </Match>
                    <Match
                      when={
                        arrival().data.personal_information.gender === "female"
                      }
                    >
                      ຍົງ
                    </Match>
                  </Switch>
                )}
              </Show>
            </dd>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ສັນຊາດ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(arrival) => arrival().data.personal_information.nationality}
              </Show>
            </dd>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ອາຊີບ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(arrival) => arrival().data.personal_information.occupation}
              </Show>
            </dd>
          </dl>
        </div>
      </div>

      <div>
        <h2 class="mb-4 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">
          ຂໍ້ມູນຫນັງສືຜ່ານແດນ
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Show when={arrival()} fallback={"..."}>
            {(arrival) => (
              <img
                src={
                  import.meta.env.VITE_IMG_URL +
                  arrival().data.passport_information.image
                }
                alt="passport image"
                class="w-full rounded-lg border"
              />
            )}
          </Show>

          <dl class="ms-0 md:ms-4 flex flex-row md:flex-col justify-between md:justify-start">
            <div>
              <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                ເລກໜັງສືຜ່ານແດນ
              </dt>
              <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                <Show when={arrival()} fallback={"..."}>
                  {(arrival) => arrival().data.passport_information.number}
                </Show>
              </dd>
            </div>
            <div>
              <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                ວັນ​ຫມົດ​ອາ​ຍຸ
              </dt>
              <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                <Show when={arrival()} fallback={"..."}>
                  {(arrival) =>
                    format(
                      arrival().data.passport_information.expiry_date,
                      "dd/MM/yyyy"
                    )
                  }
                </Show>
              </dd>
            </div>
            <div>
              <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                ວັນທີອອກ
              </dt>
              <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                <Show when={arrival()} fallback={"..."}>
                  {(arrival) =>
                    format(
                      arrival().data.passport_information.date_issue,
                      "dd/MM/yyyy"
                    )
                  }
                </Show>
              </dd>
            </div>
            <div>
              <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                ສະ​ຖານ​ທີ່​ອອກ
              </dt>
              <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                <Show when={arrival()} fallback={"..."}>
                  {(arrival) => arrival().data.passport_information.place_issue}
                </Show>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={arrival.loading}>
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
  );
};
