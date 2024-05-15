import { Input, maxLength, minLength, number, object, string } from "valibot";

export const ProvinceTranslateSchemas = object({
  id: number(),
  name: string([
    minLength(1, "ກະລຸນາປ້ອນຫົວຂໍ້."),
    maxLength(255, "ຫົວຂໍ້ຍາວເກີນໄປ."),
  ]),
});

export type ProvinceTranslateFormInput = Input<typeof ProvinceTranslateSchemas>;
