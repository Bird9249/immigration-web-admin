import { isBefore } from "date-fns";
import {
  custom,
  Input,
  maxLength,
  minLength,
  object,
  string,
  tuple,
} from "valibot";

export const CheckInGuestSchema = object({
  verify_code: string([minLength(1), maxLength(10)]),
  room_no: string("ຕ້ອງເປັນ string"),
  check: tuple(
    [
      string("ຕ້ອງເປັນ string", [minLength(1, "ກະລຸນາເລືອກວັນທີ")]),
      string("ຕ້ອງເປັນ string", [minLength(1, "ກະລຸນາເລືອກວັນທີ")]),
    ],
    "ກະລຸນາເລືອກວັນທີ",
    [
      custom((input) => {
        if (input[0] && input[1]) {
          return isBefore(input[0], input[1]);
        } else {
          return true;
        }
      }, "ເວລາເຂົ້າຕ້ອງກ່ອນເວລາອອກ"),
    ]
  ),
});

export type CheckInGuestSchemaType = Input<typeof CheckInGuestSchema>;
