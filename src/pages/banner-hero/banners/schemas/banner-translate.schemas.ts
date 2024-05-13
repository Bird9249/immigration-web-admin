import { Input, maxLength, minLength, number, object, string } from "valibot";

export const BannerTranslateSchemas = object({
  id: number(),
  title: string([
    minLength(1, "ກະລຸນາປ້ອນຫົວຂໍ້."),
    maxLength(255, "ຫົວຂໍ້ຍາວເກີນໄປ."),
  ]),
  description: string([maxLength(1000)]),
});

export type BannerTranslateFormInput = Input<typeof BannerTranslateSchemas>;
