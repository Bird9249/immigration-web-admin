import { Input, maxLength, minLength, number, object, string } from "valibot";

export const HotelTranslateSchemas = object({
  id: number(),
  name: string([
    minLength(1, "ກະລຸນາປ້ອນຫົວຂໍ້."),
    maxLength(255, "ຫົວຂໍ້ຍາວເກີນໄປ."),
  ]),
  address: string([minLength(1, "ກະລຸນາປ້ອນທີຢູ່ກ່ອນ"), maxLength(1000)]),
});

export type HotleTranslateFormInput = Input<typeof HotelTranslateSchemas>;
