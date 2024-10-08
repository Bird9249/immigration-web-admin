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
import deleteHotelApi from "./api/delete-hotel.api";
import getHotelDetailApi from "./api/get-hotel-detail.api";

export default () => {
  const param = useParams();
  const navigator = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  const [id] = createSignal<string>(param.id);

  const [hotel] = createResource(id, getHotelDetailApi);

  return (
    <div class="relative">
      <Show when={hotel()} fallback={<div class="h-[470px]"></div>}>
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
                <div>
                  <br />
                  <div class="px-4 mb-4 grid gap-4 sm:mb-5 sm:grid-cols-2 sm:gap-6 md:gap-12">
                    <dl>
                      <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ຊື່ໂຮງແຮມ
                      </dt>
                      <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <p>{val.name}</p>
                      </dd>
                    </dl>
                    <dl>
                      <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ທີຢູ່
                      </dt>
                      <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <p>
                          ບ້ານ: {val.village}, ເມືອງ: {val.district}, ແຂວງ:{" "}
                          {val.province}
                        </p>
                      </dd>
                    </dl>
                  </div>
                  <div class="px-4 mb-4 grid gap-4 sm:mb-5 sm:grid-cols-2 sm:gap-6 md:gap-12">
                    <dl>
                      <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ຮູບພາບ
                      </dt>
                      <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <div class="relative w-full mx-auto">
                          <img
                            class="w-full object-cover rounded-md"
                            src={
                              import.meta.env.VITE_IMG_URL + hotel()?.data.image
                            }
                            alt="No image"
                          />
                        </div>
                      </dd>
                    </dl>
                    <dl>
                      <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ເບີໂທ
                      </dt>
                      <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <Show
                          when={hotel()?.data.phone_number}
                          fallback={"ບໍ່ມີຂໍ້ມູນ"}
                        >
                          {(hotel_phone_number) => hotel_phone_number()}
                        </Show>
                      </dd>
                      <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ລິ້ງໂຮງແຮມ
                      </dt>
                      <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <Show when={hotel()} fallback={"ບໍ່ມີຂໍ້ມູນ"}>
                          {(hotel_link) => (
                            <a
                              href={hotel_link().data.link}
                              class="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                            >
                              {hotel_link().data.link}
                            </a>
                          )}
                        </Show>
                      </dd>

                      <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ເວລາສ້າງ:
                      </dt>
                      <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <Show
                          when={hotel()?.data.created_at}
                          fallback={"ບໍ່ມີຂໍ້ມູນເວລາສ້າງ"}
                        >
                          {(hotel_created_at) =>
                            format(hotel_created_at(), "dd/MM/yyyy HH:mm:ss")
                          }
                        </Show>
                      </dd>
                      <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ເວລາອັບເດດ:
                      </dt>
                      <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <Show
                          when={hotel()?.data.updated_at}
                          fallback={"ບໍ່ມີຂໍ້ມູນເວລາອັບເດດ"}
                        >
                          {(hotel_updated_at) =>
                            format(hotel_updated_at(), "dd/MM/yyyy HH:mm:ss")
                          }
                        </Show>
                      </dd>
                    </dl>
                  </div>
                </div>
              ),
            }))}
          />
        )}
      </Show>
      <br />

      <div class="p-4 flex items-center">
        <Show
          when={checkPermission(Permission.Write, PermissionGroup.Hotel, auth)}
        >
          <Button
            class="mr-3"
            color="primary"
            prefixIcon={<EditIcon />}
            onClick={() => {
              navigator(`/hotels/edit/${param.id}`);
            }}
          >
            ແກ້ໄຂ
          </Button>
        </Show>

        <Show
          when={checkPermission(Permission.Remove, PermissionGroup.Hotel, auth)}
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
                  const res = await deleteHotelApi(param.id);

                  actionMessage.showMessage({
                    level: "success",
                    message: res.data.message,
                  });
                },
              });
            }}
          >
            ລຶບ
          </Button>
        </Show>
      </div>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={hotel.loading}>
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
