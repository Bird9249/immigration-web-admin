import { Input, maxLength, minLength, number, object, string } from "valibot";

export const HotelTranslateSchemas = object({
  id: number(),
  name: string([
    minLength(1, "ກະລຸນາປ້ອນຫົວຂໍ້."),
    maxLength(255, "ຫົວຂໍ້ຍາວເກີນໄປ."),
  ]),
  province: string("ຈະຕ້ອງເປັນ string.", [maxLength(255, "ຫົວຂໍ້ຍາວເກີນໄປ")]),
  district: string("ຈະຕ້ອງເປັນ string.", [maxLength(255, "ຫົວຂໍ້ຍາວເກີນໄປ")]),
  village: string("ຈະຕ້ອງເປັນ string.", [maxLength(255, "ຫົວຂໍ້ຍາວເກີນໄປ")]),
});

export type HotelTranslateFormInput = Input<typeof HotelTranslateSchemas>;
