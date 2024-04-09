import { A, useNavigate } from "@solidjs/router";
import { format } from "date-fns";
import { createResource, createSignal, Show } from "solid-js";
import {
  Permission,
  PermissionGroup,
} from "../../../common/enum/permission.enum";
import checkPermission from "../../../common/utils/check-permission";
import Button from "../../../components/button/Button";
import Select from "../../../components/forms/select/Select";
import CheckIcon from "../../../components/icons/CheckIcon";
import InputSearch from "../../../components/input-search/InputSearch";
import Table from "../../../components/table/Table";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { DepartureTableState, ListDeparture } from "./api/departure.interface";
import getDepartureRegistrationApi from "./api/get-departure-registration.api";
import VerifyDepartureCode from "./components/VerifyDepartureCode";

export default () => {
  const auth = useAuth();
  const navigate = useNavigate();
  if (!checkPermission(Permission.Read, PermissionGroup.Registration, auth))
    navigate(-1);

  const [openVerify, setOpenVerify] = createSignal<boolean>(false);

  const [state, setState] = createSignal<DepartureTableState>({
    offset: 0,
    limit: 10,
    entry_name: "",
    passport_number: "",
    verification_code: "",
    black_list: undefined,
    is_verified: undefined,
  });

  const [arrival, { refetch }] = createResource(
    state,
    getDepartureRegistrationApi
  );

  return (
    <>
      <Table
        header={
          <>
            <div class="flex flex-col sm:flex-row justify-between border-b dark:border-gray-600 gap-2 p-4 items-start sm:items-center">
              <h2 class="text-lg font-semibold mb-2 sm:mb-0 dark:text-white">
                ລາຍການລົງທະບຽນເຂົ້າອອກ
              </h2>
              <div class="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-fit">
                <Show
                  when={checkPermission(
                    Permission.Write,
                    PermissionGroup.Registration,
                    auth
                  )}
                >
                  <Button
                    class="w-full sm:w-fit"
                    color="primary"
                    prefixIcon={<CheckIcon iconDirection="badge" />}
                    onClick={() => {
                      setOpenVerify(true);
                    }}
                  >
                    ກວດສອບ
                  </Button>
                </Show>
              </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 py-3 mx-4">
              <InputSearch
                placeholder="ຈຸດເຂົ້າ..."
                onSearch={(val) => {
                  setState((prev) => ({ ...prev, entry_name: val }));
                }}
                onClear={(val) => {
                  if (val !== state().entry_name) {
                    setState((prev) => ({ ...prev, entry_name: "" }));
                  }
                }}
              />
              <InputSearch
                placeholder="ເລກທີ່ passport..."
                onSearch={(val) => {
                  setState((prev) => ({ ...prev, passport_number: val }));
                }}
                onClear={(val) => {
                  if (val !== state().passport_number) {
                    setState((prev) => ({ ...prev, passport_number: "" }));
                  }
                }}
              />

              <InputSearch
                placeholder="ລະຫັດຢືນຢັນ..."
                onSearch={(val) => {
                  setState((prev) => ({ ...prev, verification_code: val }));
                }}
                onClear={(val) => {
                  if (val !== state().verification_code) {
                    setState((prev) => ({ ...prev, verification_code: "" }));
                  }
                }}
              />
              <Select
                size="xs"
                items={[
                  { label: "ການກວດສອບ", value: "" },
                  { label: "ສຳເລັດ", value: "verified" },
                  { label: "ຍັງບໍ່ສຳເລັດ", value: "no_verified" },
                ]}
                placeholder="ການກວດສອບ"
                onValueChange={({ value }) => {
                  setState((prev) => ({
                    ...prev,
                    is_verified: value[0] as "verified" | "no_verified",
                  }));
                }}
              ></Select>
              <Select
                size="xs"
                items={[
                  { label: "ບັນຊີດຳ", value: "" },
                  { label: "ບໍ່ມີໃນບັນຊີດຳ", value: "available" },
                  { label: "ມີໃນບັນຊີດຳ", value: "unavailable" },
                ]}
                placeholder="ບັນຊີດຳ"
                onValueChange={({ value }) => {
                  setState((prev) => ({
                    ...prev,
                    black_list: value[0] as "available" | "unavailable",
                  }));
                }}
              ></Select>
            </div>
          </>
        }
        value={arrival}
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
            header: "ຈຸດອອກ",
            body: ({ departure_name }: ListDeparture) => departure_name,
          },
          {
            header: "ເລກທີ່ເອກະສານ",
            body: ({ passport_information }: ListDeparture) => (
              <dl>
                <div class="flex items-center">
                  <dt class="me-1 leading-none text-gray-500 dark:text-gray-400">
                    Passport:
                  </dt>
                  <dd class="font-semibold text-gray-900 dark:text-white">
                    {passport_information.number}
                  </dd>
                </div>
              </dl>
            ),
          },
          {
            header: "ລະຫັດຢືນຢັນເຂົ້າເມືອງ",
            body: ({ verification_code, verified_at }: ListDeparture) => (
              <div
                class="flex items-center gap-2"
                classList={{
                  "font-medium text-green-600 dark:text-green-400":
                    !!verified_at && !!verification_code,
                  "font-medium text-gray-900 dark:text-white":
                    !verified_at && !!verification_code,
                }}
              >
                <Show when={!!verified_at}>
                  <CheckIcon iconDirection="circle" class="size-5" />
                </Show>
                {verification_code
                  ? verification_code.split("").join(" ")
                  : "ລົງທະບຽນບໍ່ສຳເລັດ"}
              </div>
            ),
          },
          {
            header: "ບັນຊີດໍາ",
            body: ({ black_list }: ListDeparture) => (
              <div class="flex items-center">
                <div
                  class="border rounded-full size-3 mr-2"
                  classList={{
                    "bg-green-500": black_list === "available",
                    "bg-red-500": black_list === "unavailable",
                  }}
                ></div>
                {black_list === "available" ? "ບໍ່ມີໃນບັນຊີດຳ" : "ມີໃນບັນຊີດຳ"}
              </div>
            ),
          },
          {
            header: "ລົງທະບຽນເມືອ",
            body: ({ created_at }: ListDeparture) =>
              format(created_at, "dd/MM/yyyy hh:mm:ss"),
          },
          {
            header: "ຈັດການ",
            body: ({ id }: ListDeparture) => (
              <Show
                when={checkPermission(
                  Permission.Read,
                  PermissionGroup.Registration,
                  auth
                )}
              >
                <A
                  href={`${id}`}
                  class="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  ລາຍລະອຽດ
                </A>
              </Show>
            ),
          },
        ]}
      </Table>
      <VerifyDepartureCode
        open={[openVerify, setOpenVerify]}
        onSuccess={async () => await refetch()}
      />
    </>
  );
};
