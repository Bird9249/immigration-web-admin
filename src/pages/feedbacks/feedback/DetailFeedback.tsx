import { useNavigate, useParams } from "@solidjs/router";
import { Show, createResource, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../../contexts/message/MessageContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import deleteFeedbackApi from "./api/delete-feedback.api";
import getFeedbackDetailApi from "./api/get-feedback-detail.api";

export default () => {
  const param = useParams();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();
  const auth = useAuth();
  const navigate = useNavigate();

  if (!checkPermission(Permission.Read, PermissionGroup.Feedback, auth))
    navigate(-1);

  const [id] = createSignal<string>(param.id);

  const [feedbacks] = createResource(id, getFeedbackDetailApi);

  return (
    <div class="relative">
      <div class="px-4 grid gap-4 sm:grid-cols-3 sm:gap-6 md:gap-12">
        <dl>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ຊື
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show when={feedbacks()} fallback={"ບໍ່ມີຂໍ້ມູນ"}>
              {(feedback_name) => feedback_name().data.name}
            </Show>
          </dd>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ເບີໂທ
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show when={feedbacks()} fallback={"ບໍ່ມີຂໍ້ມູນ"}>
              {(feedback_tel) => feedback_tel().data.tel}
            </Show>
          </dd>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ຄຳຕິຊົມ
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show when={feedbacks()} fallback={"ບໍ່ມີຂໍ້ມູນ"}>
              {(feedback_message) => feedback_message().data.message}
            </Show>
          </dd>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            ທີ່​ຢູ່​ອີ​ເມວ
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show when={feedbacks()} fallback={"ບໍ່ມີຂໍ້ມູນ"}>
              {(feedback_email) => feedback_email().data.email}
            </Show>
          </dd>
        </dl>
        <dl>
          <dt class="text-gray-900 dark:text-white leading-4 font-normal mb-2">
            URLຂອງຮູບຫຼືວິດີໂອທີ່ຕິດຄັດມາກັບຄຳຕິຊົມ
          </dt>
          <dd class="text-gray-500 dark:text-gray-400 font-light mb-4 sm:mb-5">
            <Show when={feedbacks()?.data.media} fallback={"ບໍ່ມີຂໍ້ມູນ"}>
              {(feedback_media) => {
                if (feedback_media) {
                  const mediaUrl =
                    import.meta.env.VITE_IMG_URL + feedback_media();
                  const fileExtension = feedback_media()
                    .split(".")
                    .pop()
                    ?.toLowerCase();
                  switch (fileExtension) {
                    case "mp4":
                      return (
                        <video
                          src={mediaUrl}
                          controls
                          class="rounded-md"
                        ></video>
                      );
                    case "png":
                    case "jpg":
                      return (
                        <img src={mediaUrl} alt="no mage" class="rounded-md" />
                      );
                    default:
                      return null;
                  }
                } else {
                  return null;
                }
              }}
            </Show>
          </dd>
        </dl>
      </div>

      <div class="flex items-center">
        <Show
          when={checkPermission(
            Permission.Remove,
            PermissionGroup.Feedback,
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
                  const res = await deleteFeedbackApi(param.id);

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
        <Show when={feedbacks.loading}>
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
