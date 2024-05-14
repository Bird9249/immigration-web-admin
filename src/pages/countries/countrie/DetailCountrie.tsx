import { useNavigate, useParams } from "@solidjs/router";
import { format } from "date-fns";
import { Show, createResource, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import EditIcon from "../../../components/icons/EditIcon";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Tabs from "../../../components/tabs/Tabs";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import deleteCountriesApi from "./api/delete-countries.api";
import getCountriesDetailApi from "./api/get-countries-detail.api";

export default () => {
  const param = useParams();
  const navigator = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  const [id] = createSignal<string>(param.id);

  const [countries] = createResource(id, getCountriesDetailApi);

  return (
    <>
      <h2 class=" text-xl font-bold text-gray-900 dark:text-white">
        ລາຍລະອຽດປະເທດ
      </h2>

      <div class="relative">
        <Show when={countries()} fallback={<div class="h-[470px]"></div>}>
          {(item) => (
            <Tabs
              items={item().data.translates.map((val) => ({
                key: val.lang,
                label:
                  val.lang === "lo"
                    ? "ພາສາລາວ"
                    : val.lang === "en"
                    ? "ພາສາອັງກິດ"
                    : "ພາສາຈີນ",
              }))}
              contents={item().data.translates.map((val) => ({
                key: val.lang,
                content: (
                  <dl class="mt-4">
                    <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                      ຊື່
                    </dt>
                    <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                      {val.name}
                    </dd>

                    <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                      ຄຳອະທິບາຍ
                    </dt>
                    <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                      {val.description}
                    </dd>
                  </dl>
                ),
              }))}
            />
          )}
        </Show>

        <div class="grid gap-4 my-4 sm:mb-8 md:grid-cols-2 md:gap-6">
          <div class="grid gap-4 sm:mb-5 sm:grid-cols-1 sm:gap-6 md:gap-12">
            <div class="relative w-full mx-auto">
              <Show when={countries()} fallback={"..."}>
                {(item) => (
                  <img
                    class="w-full object-cover rounded-md"
                    src={import.meta.env.VITE_IMG_URL + item().data.image}
                    alt="Random image"
                  />
                )}
              </Show>
            </div>
          </div>

          <dl>
            <div class="grid sm:mb-8 md:grid-cols-2">
              <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                ຍົກເວັ້ນວິຊາ:
              </dt>
              <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                <Show when={countries()} fallback={"..."}>
                  {(item) => (
                    <div class="flex items-center">
                      <div
                        class="border rounded-full size-3 mr-2"
                        classList={{
                          "bg-green-500": item().data.is_except_visa,
                          "bg-red-500": !item().data.is_except_visa,
                        }}
                      ></div>
                      {item().data.is_except_visa
                        ? "ຍົກເວັ້ນວິຊາ"
                        : "ຕ້ອງການວີຊາ"}
                    </div>
                  )}
                </Show>
              </dd>

              <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                ເວລາສ້າງ:
              </dt>
              <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                <Show when={countries()} fallback={"..."}>
                  {(countries_created_at) =>
                    format(
                      countries_created_at().data.created_at,
                      "dd/MM/yyyy HH:mm:ss"
                    )
                  }
                </Show>
              </dd>
              <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                ເວລາອັບເດດ:
              </dt>
              <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                <Show when={countries()} fallback={"..."}>
                  {(countries_updated_at) =>
                    format(
                      countries_updated_at().data.updated_at,
                      "dd/MM/yyyy HH:mm:ss"
                    )
                  }
                </Show>
              </dd>
            </div>
          </dl>
        </div>

        <div class="p-4 flex items-center">
          <Show
            when={checkPermission(
              Permission.Write,
              PermissionGroup.Countries,
              auth
            )}
          >
            <Button
              class="mr-3"
              color="primary"
              prefixIcon={<EditIcon />}
              onClick={() => {
                navigator(`/countries/edit/${param.id}`);
              }}
            >
              ແກ້ໄຂ
            </Button>
          </Show>

          <Show
            when={checkPermission(
              Permission.Remove,
              PermissionGroup.Countries,
              auth
            )}
          >
            <Button
              color="danger"
              prefixIcon={<TrashIcon />}
              onClick={() => {
                actionConfirm.showConfirm({
                  icon: () => (
                    <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                  ),
                  message: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                  onConfirm: async () => {
                    const res = await deleteCountriesApi(param.id);

                    actionMessage.showMessage({
                      level: "success",
                      message: res.data.message,
                    });

                    navigator("countries", { resolve: false });
                  },
                });
              }}
            >
              ລຶບ
            </Button>
          </Show>
        </div>

        <Transition onEnter={fadeIn} onExit={fadeOut}>
          <Show when={countries.loading}>
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
    </>
  );
};
