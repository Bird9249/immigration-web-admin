import { A, useNavigate } from "@solidjs/router";
import { format } from "date-fns";
import { createResource, createSignal, Show } from "solid-js";
import { DateTimeFormatForSave } from "../../common/enum/date-time-fomat-for-save.enum";
import Button from "../../components/button/Button";
import InputDatetime from "../../components/forms/input-datetime/InputDatetime";
import CheckIcon from "../../components/icons/CheckIcon";
import InputSearch from "../../components/input-search/InputSearch";
import Modal from "../../components/modal/Modal";
import Table from "../../components/table/Table";
import { useConfirm } from "../../contexts/confirm/ConfirmContext";
import { useMessage } from "../../contexts/message/MessageContext";
import {
  AdminHotelResponse,
  AdminHotelTableState,
} from "./apis/admin-hotel.interface";
import guestListApi from "./apis/guest-list.api";
import CheckInGuest from "./CheckInGuest";

export default () => {
  const navigate = useNavigate();
  const [, actionConfirm] = useConfirm();
  const [, actionMessage] = useMessage();

  const [state, setState] = createSignal<AdminHotelTableState>({
    offset: 0,
    limit: 10,
    check_in: "",
    check_out: "",
    room_no: "",
  });
  const [hotels, { refetch }] = createResource(state, guestListApi);
  const [openForm, setOpenForm] = createSignal<boolean>(false);

  return (
    <>
      <Table
        header={
          <>
            <div class="flex flex-col items-start justify-between border-b dark:border-gray-600 p-4 sm:flex-row sm:items-center">
              <h2 class="text-lg font-semibold mb-2 sm:mb-0 dark:text-white">
                ຕາຕະລາງລາຍການແຂກທີ່ເຂົ້າພັກ
              </h2>

              <Button
                class="w-full sm:w-fit"
                color="primary"
                prefixIcon={<CheckIcon iconDirection="badge" />}
                onClick={() => {
                  setOpenForm(true);
                }}
              >
                ກວດສອບ
              </Button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-3 mx-4">
              <InputSearch
                placeholder="ເລກຫ້ອງ..."
                onSearch={(val) => {
                  setState((prev) => ({ ...prev, room_no: val }));
                }}
                onClear={(val) => {
                  if (val !== state().room_no) {
                    setState((prev) => ({ ...prev, room_no: "" }));
                  }
                }}
              />
              <InputDatetime
                placeholder="ເວລາເຂົ້າພັກ..."
                onInput={(val) => {
                  if (val.target.value) {
                    setState((prev) => ({
                      ...prev,
                      check_in: format(
                        val.target.value,
                        DateTimeFormatForSave.Timestamp
                      ),
                    }));
                  } else {
                    setState((prev) => ({
                      ...prev,
                      check_in: "",
                    }));
                  }
                }}
                inputClass="!p-2 text-xs"
              />

              <InputDatetime
                placeholder="ເວລາອອກ..."
                onInput={(val) => {
                  if (val.target.value) {
                    setState((prev) => ({
                      ...prev,
                      check_out: format(
                        val.target.value,
                        DateTimeFormatForSave.Timestamp
                      ),
                    }));
                  } else {
                    setState((prev) => ({
                      ...prev,
                      check_out: "",
                    }));
                  }
                }}
                inputClass="!p-2 text-xs"
              />
            </div>
          </>
        }
        value={hotels}
        responseField="data"
        onChange={({ paginate }) => {
          setState((prev) => ({
            ...prev,
            limit: paginate.limit,
            offset: paginate.offset,
          }));
        }}
      >
        {[
          {
            header: "ຊື່ ແລະ ນາມສະກຸນ",
            body: ({
              personal_information: { name, family_name },
            }: AdminHotelResponse) => `${name} ${family_name}`,
          },
          {
            header: "ເພດ",
            body: ({
              personal_information: { gender },
            }: AdminHotelResponse) => (
              <Show
                when={gender === "male"}
                fallback={
                  <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    ຍິງ
                  </span>
                }
              >
                <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  ຊາຍ
                </span>
              </Show>
            ),
          },
          {
            header: "ເລກຫ້ອງ",
            body: ({ room_no }: AdminHotelResponse) => room_no,
          },
          {
            header: "ເວລາເຂົ້າພັກ - ອອກ",
            body: ({ check_in, check_out }: AdminHotelResponse) =>
              `${format(check_in, "dd/MM/yyyy HH:mm")} - ${format(
                check_out,
                "dd/MM/yyyy HH:mm"
              )}`,
          },
          {
            body: ({ id }: AdminHotelResponse) => (
              <A
                href={`/admin-hotels/${id}`}
                class="font-medium text-primary-600 dark:text-primary-500 hover:underline ms-3"
              >
                ລາຍລະອຽດ
              </A>
            ),
          },
        ]}
      </Table>
      <Modal
        onOpenChange={({ open }) => {
          setOpenForm(open);
        }}
        open={openForm()}
        size="md"
      >
        <CheckInGuest
          onClose={() => {
            setOpenForm(false);
          }}
        />
      </Modal>
    </>
  );
};
