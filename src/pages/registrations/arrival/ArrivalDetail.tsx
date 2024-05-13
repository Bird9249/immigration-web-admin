import { useParams } from "@solidjs/router";
import { format } from "date-fns";
import { createResource, createSignal, Match, Show, Switch } from "solid-js";
import { Transition } from "solid-transition-group";
import Button from "../../../components/button/Button";
import BriefcaseIcon from "../../../components/icons/BriefcaseIcon";
import CameraPhotoIcon from "../../../components/icons/CameraPhotoIcon";
import CheckIcon from "../../../components/icons/CheckIcon";
import FlagIcon from "../../../components/icons/FlagIcon";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import MapIcon from "../../../components/icons/MapIcon";
import TruckIcon from "../../../components/icons/TruckIcon";
import Timeline from "../../../components/timeline/Timeline";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import getArrivalRegistrationDetailApi from "./api/get-arrival-registration-detail.api";
import verifyArrivalCodeApi from "./api/verify-arrival-code.api";

export default () => {
  const param = useParams();
  const [, actionMessage] = useMessage();
  const [, actionConfirm] = useConfirm();

  const [id] = createSignal<string>(param.id);

  const [arrival, { refetch, mutate }] = createResource(
    id,
    getArrivalRegistrationDetailApi
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
        const res = await verifyArrivalCodeApi(id());
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
          ຂໍ້ມູນການເຂົ້າເມືອງ
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2">
          <dl>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ຈຸດເຂົ້າ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(arrival) => arrival().data.entry_name}
              </Show>
            </dd>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ຈຸດປະສົງຂອງການເຂົ້າ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(arrival) => (
                  <span class="flex gap-1 items-center">
                    <Switch>
                      <Match when={arrival().data.purpose === "business"}>
                        <BriefcaseIcon class="size-4" />
                        ທຸລະກິດ
                      </Match>
                      <Match when={arrival().data.purpose === "diplomatic"}>
                        <FlagIcon class="size-4" />
                        ການ​ທູດ
                      </Match>
                      <Match when={arrival().data.purpose === "official"}>
                        <CheckIcon iconDirection="badge" class="size-4" />
                        ທາງການ
                      </Match>
                      <Match when={arrival().data.purpose === "tourism"}>
                        <CameraPhotoIcon class="size-4" />
                        ການ​ທ່ອງ​ທ​ຽ​່​ວ
                      </Match>
                      <Match when={arrival().data.purpose === "transit"}>
                        <TruckIcon class="size-4" /> ການໂດຍສານ
                      </Match>
                      <Match when={arrival().data.purpose === "visit"}>
                        <MapIcon iconDirection="alt" class="size-4" />
                        ຢ້ຽມຢາມ
                      </Match>
                    </Switch>
                  </span>
                )}
              </Show>
            </dd>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ການເດີນທາງໃນແພັກເກດການທ່ອງທ່ຽວ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(arrival) =>
                  arrival().data.is_traveling_in_tour ? (
                    <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      ແມ່ນແລ້ວ
                    </span>
                  ) : (
                    <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                      ບໍ່
                    </span>
                  )
                }
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

            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ລົງທະບຽນເມືອ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(item) =>
                  format(item().data.created_at, "dd/MM/yyyy HH:mm:ss")
                }
              </Show>
            </dd>
          </dl>

          <dl>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ເດີນທາງໂດຍ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(arrival) => (
                  <>
                    <Switch>
                      <Match
                        when={arrival().data.traveling_by_type === "flight"}
                      >
                        ທ່ຽວບິນ.
                      </Match>
                      <Match when={arrival().data.traveling_by_type === "car"}>
                        ລົດສ່ວນຕົວ.
                      </Match>
                      <Match when={arrival().data.traveling_by_type === "bus"}>
                        ລົດເມ.
                      </Match>
                    </Switch>{" "}
                    ເລກທີ່ {arrival().data.traveling_by_no}
                  </>
                )}
              </Show>
            </dd>
            <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
              ເດີນທາງມາຈາກ
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
              <Show when={arrival()} fallback={"..."}>
                {(arrival) => arrival()?.data.traveling_from}
              </Show>
            </dd>

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

      <div class="mb-6 border-b">
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

      <Show when={arrival()?.data.visa_information} fallback={"..."}>
        <div class="mb-6 border-b ">
          <h2 class="mb-4 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">
            ຂໍ້ມູນວີຊາ
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Show when={arrival()} fallback={"..."}>
              {(arrival) => (
                <img
                  src={
                    import.meta.env.VITE_IMG_URL +
                    arrival().data.visa_information.image
                  }
                  alt="passport image"
                  class="w-full rounded-lg border"
                />
              )}
            </Show>

            <dl class="ms-0 md:ms-4 flex flex-row md:flex-col justify-between md:justify-start">
              <div>
                <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                  ໝາຍເລກວີຊາ
                </dt>
                <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                  <Show when={arrival()} fallback={"..."}>
                    {(arrival) => arrival().data.visa_information.number}
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
                        arrival().data.visa_information.date_issue,
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
                    {(arrival) => arrival().data.visa_information.place_issue}
                  </Show>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Show>

      <Show when={arrival()}>
        {(item) => (
          <>
            <h2 class="mb-4 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">
              ທີ່ຢູ່ໃນປະເທດລາວ
            </h2>

            <Timeline
              items={item().data.intended_address.map((val) => ({
                title: val.name,
                time: `${format(val.check_in, "dd/MM/yyyy")} - ${format(
                  val.check_out,
                  "dd/MM/yyyy"
                )}`,
                content: (
                  <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    ບ້ານ: {val.village}, ເມືອງ: {val.district}, ແຂວງ:{" "}
                    {val.province}.
                  </p>
                ),
              }))}
            ></Timeline>
          </>
        )}
      </Show>

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
