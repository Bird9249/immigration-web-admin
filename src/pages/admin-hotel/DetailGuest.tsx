import { useParams } from "@solidjs/router";
import { format } from "date-fns";
import { createResource, createSignal, Match, Show, Switch } from "solid-js";
import { Transition } from "solid-transition-group";
import LoadingIcon from "../../components/icons/LoadingIcon";
import { fadeIn, fadeOut } from "../../utils/transition-animation";
import guestDetailApi from "./apis/guest-detail.api";

export default () => {
  const param = useParams();

  const [id] = createSignal<string>(param.id);

  const [detail] = createResource(id, guestDetailApi);

  return (
    <div class="relative">
      <Show when={detail()} fallback={<div class="h-[470px]"></div>}>
        <div class="mb-3 border-b">
          <h2 class="mb-4 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">
            ຂໍ້ມູນເຂົ້າພັກ
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2">
            <dl>
              <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                ເລກຫ້ອງ
              </dt>
              <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                <Show when={detail()} fallback={"..."}>
                  {(detail) => detail().data.room_no}
                </Show>
              </dd>
            </dl>

            <dl>
              <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                ເວລາເຂົ້າພັກ - ອອກ
              </dt>
              <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                <Show when={detail()} fallback={"..."}>
                  {(detail) =>
                    `${format(
                      detail().data.check_in,
                      "dd/MM/yyyy HH:mm"
                    )} - ${format(detail().data.check_out, "dd/MM/yyyy HH:mm")}`
                  }
                </Show>
              </dd>
            </dl>
          </div>
        </div>

        <div class="mb-3 border-b">
          <h2 class="mb-4 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">
            ຂໍ້ມູນແຂກ
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2">
            <dl>
              <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                ຊື່ ແລະ ນາມສະກຸນ
              </dt>
              <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                <Show when={detail()} fallback={"..."}>
                  {(detail) =>
                    detail().data.arrival_registration.personal_information
                      .name +
                    " " +
                    detail().data.arrival_registration.personal_information
                      .family_name
                  }
                </Show>
              </dd>
              <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                ວັນເດືອນປີເກີດ
              </dt>
              <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                <Show when={detail()} fallback={"..."}>
                  {(detail) =>
                    format(
                      detail().data.arrival_registration.personal_information
                        .date_of_birth,
                      "dd/MM/yyyy"
                    )
                  }
                </Show>
              </dd>
              <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                ສະຖານທີ່ເກີດ
              </dt>
              <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                <Show when={detail()} fallback={"..."}>
                  {(detail) =>
                    detail().data.arrival_registration.personal_information
                      .place_of_birth
                  }
                </Show>
              </dd>
              <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                ເບີໂທ
              </dt>
              <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                <Show when={detail()} fallback={"..."}>
                  {(detail) =>
                    detail().data.arrival_registration.personal_information
                      .phone_number
                  }
                </Show>
              </dd>
            </dl>

            <dl>
              <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                ເພດ
              </dt>
              <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                <Show when={detail()} fallback={"..."}>
                  {(detail) => (
                    <Switch>
                      <Match
                        when={
                          detail().data.arrival_registration
                            .personal_information.gender === "male"
                        }
                      >
                        ຊາຍ
                      </Match>
                      <Match
                        when={
                          detail().data.arrival_registration
                            .personal_information.gender === "female"
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
                <Show when={detail()} fallback={"..."}>
                  {(detail) =>
                    detail().data.arrival_registration.personal_information
                      .nationality
                  }
                </Show>
              </dd>
              <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                ອາຊີບ
              </dt>
              <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                <Show when={detail()} fallback={"..."}>
                  {(detail) =>
                    detail().data.arrival_registration.personal_information
                      .occupation
                  }
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
            <Show when={detail()} fallback={"..."}>
              {(detail) => (
                <img
                  src={
                    import.meta.env.VITE_IMG_URL +
                    detail().data.arrival_registration.passport_information
                      .image
                  }
                  alt="passport image"
                  class="w-full rounded-lg border"
                />
              )}
            </Show>

            <dl class="ms-0 md:ms-4 flex flex-row md:flex-col justify-between md:justify-start gap-2">
              <div>
                <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                  ເລກໜັງສືຜ່ານແດນ
                </dt>
                <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                  <Show when={detail()} fallback={"..."}>
                    {(detail) =>
                      detail().data.arrival_registration.passport_information
                        .number
                    }
                  </Show>
                </dd>
              </div>
              <div>
                <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                  ວັນ​ຫມົດ​ອາ​ຍຸ
                </dt>
                <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                  <Show when={detail()} fallback={"..."}>
                    {(detail) =>
                      format(
                        detail().data.arrival_registration.passport_information
                          .expiry_date,
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
                  <Show when={detail()} fallback={"..."}>
                    {(detail) =>
                      format(
                        detail().data.arrival_registration.passport_information
                          .date_issue,
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
                  <Show when={detail()} fallback={"..."}>
                    {(detail) =>
                      detail().data.arrival_registration.passport_information
                        .place_issue
                    }
                  </Show>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <Show
          when={detail()?.data.arrival_registration.visa_information}
          fallback={"..."}
        >
          <div class="mb-6 border-b ">
            <h2 class="mb-4 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">
              ຂໍ້ມູນວີຊາ
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Show when={detail()} fallback={"..."}>
                {(detail) => (
                  <img
                    src={
                      import.meta.env.VITE_IMG_URL +
                      detail().data.arrival_registration.visa_information.image
                    }
                    alt="visa image"
                    class="w-full rounded-lg border"
                  />
                )}
              </Show>

              <dl class="ms-0 md:ms-4 flex flex-row md:flex-col justify-between md:justify-start gap-2">
                <div>
                  <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                    ໝາຍເລກວີຊາ
                  </dt>
                  <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                    <Show when={detail()} fallback={"..."}>
                      {(detail) =>
                        detail().data.arrival_registration.visa_information
                          .number
                      }
                    </Show>
                  </dd>
                </div>

                <div>
                  <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                    ວັນທີອອກ
                  </dt>
                  <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                    <Show when={detail()} fallback={"..."}>
                      {(detail) =>
                        format(
                          detail().data.arrival_registration.visa_information
                            .date_issue,
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
                    <Show when={detail()} fallback={"..."}>
                      {(detail) =>
                        detail().data.arrival_registration.visa_information
                          .place_issue
                      }
                    </Show>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Show>
      </Show>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={detail.loading}>
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
