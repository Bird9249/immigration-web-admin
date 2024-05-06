import { Input, maxLength, minLength, number, object, string } from "valibot";

export const CountriesTranslateSchemas = object({
  id: number(),
  name: string([
    minLength(1, "ກະລຸນາປ້ອນຊື່."),
    maxLength(255, "ຊືບໍ່ຄວນຍາວເກີນໄປ."),
  ]),
  description: string([maxLength(1000)]),
});

export type CountriesTranslateFormInput = Input<
  typeof CountriesTranslateSchemas
>;
