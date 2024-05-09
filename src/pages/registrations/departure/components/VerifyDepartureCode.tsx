import { useNavigate } from "@solidjs/router";
import { Html5QrcodeScanner } from "html5-qrcode";
import { createSignal, onMount, ParentProps, Show } from "solid-js";
import Alert from "../../../../components/alert/Alert";
import Button from "../../../../components/button/Button";
import CloseIcon from "../../../../components/icons/CloseIcon";
import LoadingIcon from "../../../../components/icons/LoadingIcon";
import { useAxios } from "../../../../contexts/axios/AxiosContext";
import scanDepartureCodeApi from "../api/scan-departure-code.api";

type Props = {
  onClose: () => void;
};

export default ({ onClose }: ParentProps<Props>) => {
  const nav = useNavigate();

  const [scanner, setScanner] = createSignal<Html5QrcodeScanner>();
  const [isScanLoading, setIsScanLoading] = createSignal<boolean>(false);
  const {
    error: [error, setError],
  } = useAxios();

  async function resetScan(decodedText: string) {
    await scanner()!.clear();
    setIsScanLoading(true);

    await scanDepartureCodeApi({ verification_code: decodedText })
      .then((res) => {
        nav(`/registrations/departure/${res.data.id}`);
      })
      .finally(() => {
        setIsScanLoading(false);
      });
  }

  onMount(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "departure-verification-scan",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    setScanner(html5QrcodeScanner);

    scanner()!.render(resetScan, () => {});
  });

  return (
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          ກວດສອບລະຫັດລົງທະບຽນອອກເມືອງ
        </h3>
        <button
          onClick={() => onClose()}
          type="button"
          class="text-gray-400 transition bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <CloseIcon class="size-5" />
          <span class="sr-only">Close modal</span>
        </button>
      </div>

      <div class="p-4 md:p-5">
        <div class="flex justify-center flex-col items-center">
          <div id="departure-verification-scan" class="size-full"></div>
        </div>

        <Show when={error()}>
          {(err) => (
            <>
              <Alert level={err().level} message={err().message} />

              <div class="flex justify-center">
                <Button
                  color="secondary"
                  onClick={() => {
                    setError(undefined);
                    scanner()!.render(resetScan, () => {});
                  }}
                >
                  ສະແກນໃໝ່
                </Button>
              </div>
            </>
          )}
        </Show>
      </div>

      <Show when={isScanLoading()}>
        <div class="h-[300px] w-full flex justify-center items-center">
          <LoadingIcon class="animate-spin w-8 h-8" />
        </div>
      </Show>
    </div>
  );
};
