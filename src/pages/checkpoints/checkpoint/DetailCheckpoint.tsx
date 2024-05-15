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
import deleteCheckpointApi from "./apis/delete-checkpoint.api";
import getOneCheckpointApi from "./apis/get-one-checkpoint.api";

export default () => {
  const param = useParams();
  const navigator = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();

  const [id] = createSignal<string>(param.id);

  const [checkpoint] = createResource(id, getOneCheckpointApi);

  return (
    <div class="relative">
      <Show when={checkpoint()} fallback={<div class="h-[470px]"></div>}>
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
                  <div class="px-4 my-4 grid gap-4 sm:mb-5 sm:grid-cols-2 sm:gap-6 md:gap-12">
                    <dl>
                      <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ຊື່ດ່ານ
                      </dt>
                      <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <p>{val.name}</p>
                      </dd>
                    </dl>
                    <dl>
                      <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                        ທີຢູ່ດ່ານ
                      </dt>
                      <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                        <p>{val.address}</p>
                      </dd>
                    </dl>
                  </div>

                  <dl class="px-4 mb-4">
                    <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
                      ເນື້ອຫາດ່ານ
                    </dt>
                    <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
                      <p>{val.content}</p>
                    </dd>
                  </dl>
                </div>
              ),
            }))}
          />
        )}
      </Show>

      <div class="px-4 my-4 grid gap-4 sm:mb-5 sm:grid-cols-2 sm:gap-6 md:gap-12">
        <dl>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ປະເພດດ່ານ
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show when={checkpoint()?.data.category} fallback={"ບໍ່ມີຂໍ້ມູນ"}>
              {(category) => category().translates[0].title}
            </Show>
          </dd>
        </dl>
        <dl>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ແຂວງທີຢູ່ຂອງດ່ານ
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show when={checkpoint()?.data.province} fallback={"ບໍ່ມີຂໍ້ມູນ"}>
              {(province) => province().translates[0].name}
            </Show>
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
                src={import.meta.env.VITE_IMG_URL + checkpoint()?.data.image}
                alt="No image"
              />
            </div>
          </dd>
        </dl>
        <dl>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ເບີໂທຕິດຕໍ່
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show
              when={checkpoint()?.data.phone_number}
              fallback={"ບໍ່ມີຂໍ້ມູນ"}
            >
              {(phone_number) => phone_number()}
            </Show>
          </dd>

          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ອີເມວຕິດຕໍ່
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show when={checkpoint()?.data.email} fallback={"ບໍ່ມີຂໍ້ມູນ"}>
              {(email) => email()}
            </Show>
          </dd>
        </dl>
      </div>

      <dl class="px-4 mb-4">
        <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
          ແຜ່ນທີ່
        </dt>
        <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
          <Show when={checkpoint()?.data.link_map} fallback={"ບໍ່ມີຂໍ້ມູນ"}>
            {(link_map) => <div innerHTML={link_map()}></div>}
          </Show>
        </dd>
      </dl>

      <div class="px-4 mt-4 grid gap-4 sm:mb-5 sm:grid-cols-2 sm:gap-6 md:gap-12">
        <dl>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ເພີ່ມເມື່ອ:
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show
              when={checkpoint()?.data.created_at}
              fallback={"ບໍ່ມີຂໍ້ມູນເວລາສ້າງ"}
            >
              {(created_at) => format(created_at(), "dd/MM/yyyy HH:mm:ss")}
            </Show>
          </dd>
        </dl>
        <dl>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ອັບເດດລ່າສຸດເມື່ອ:
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show
              when={checkpoint()?.data.updated_at}
              fallback={"ບໍ່ມີຂໍ້ມູນເວລາອັບເດດ"}
            >
              {(updated_at) => format(updated_at(), "dd/MM/yyyy HH:mm:ss")}
            </Show>
          </dd>
        </dl>
      </div>

      <div class="p-4 flex items-center">
        <Show
          when={checkPermission(
            Permission.Write,
            PermissionGroup.Checkpoint,
            auth
          )}
        >
          <Button
            class="mr-3"
            color="primary"
            prefixIcon={<EditIcon />}
            onClick={() => {
              navigator(`/checkpoint/edit/${param.id}`);
            }}
          >
            ແກ້ໄຂ
          </Button>
        </Show>

        <Show
          when={checkPermission(
            Permission.Remove,
            PermissionGroup.Checkpoint,
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
                  const res = await deleteCheckpointApi(param.id);

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
        <Show when={checkpoint.loading}>
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
