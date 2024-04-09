import { Input, maxLength, minLength, object, string } from "valibot";

export const AccommodationRequestTranslateSchemas = object({
  title: string([
    minLength(1, "ກະລຸນາປ້ອນຫົວຂໍ້."),
    maxLength(255, "ຫົວຂໍ້ຍາວເກີນໄປ."),
  ]),
  content: string([minLength(1, "ກະລຸນາປ້ອນຂໍ້ມູນ."), maxLength(1000)]),
});

export type BannerTranslateFormInput = Input<
  typeof AccommodationRequestTranslateSchemas
>;
