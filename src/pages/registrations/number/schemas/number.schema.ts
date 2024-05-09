import { Input, minValue, number, object } from "valibot";

export const NumberSchema = object({
  number: number("ກະລຸນາປ້ອນໂຕເລກ", [minValue(1, "ຈຳນວນຕ່ຳສຸດຕ້ອງບໍ່ເກີນ 1")]),
});

export type NumberSchemaType = Input<typeof NumberSchema>;
