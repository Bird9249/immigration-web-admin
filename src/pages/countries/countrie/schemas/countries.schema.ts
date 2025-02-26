import {
  Input,
  boolean,
  maxSize,
  merge,
  mimeType,
  object,
  omit,
  optional,
  special,
  tuple,
} from "valibot";
import { CountriesTranslateSchemas } from "./countries-translates.schema";

const isFile = (input: unknown) =>
  input !== undefined ? input instanceof File : true;

export const CountriesSchema = object({
  image: optional(
    special<File>(isFile, "ຮູບພາບບໍ່ຄວນຫວ່າງເປົ່າ", [
      mimeType(
        ["image/jpeg", "image/png", "image/webp"],
        "ກະລຸນາເລືອກໄຟລ໌ JPEG ຫຼື PNG ຫຼື Webp."
      ),
      maxSize(1024 * 1024 * 10, "ກະລຸນາເລືອກໄຟລ໌ທີ່ນ້ອຍກວ່າ 10 MB."),
    ])
  ),
  is_except_visa: boolean(),
  translates: tuple([
    omit(CountriesTranslateSchemas, ["id"]),
    omit(CountriesTranslateSchemas, ["id"]),
    omit(CountriesTranslateSchemas, ["id"]),
  ]),
});

export const UpdateCountriesSchema = merge([
  omit(CountriesSchema, ["translates"]),
  object({
    translates: tuple([
      CountriesTranslateSchemas,
      CountriesTranslateSchemas,
      CountriesTranslateSchemas,
    ]),
  }),
]);

export type CountriesForm = Input<typeof CountriesSchema>;
export type UpdateCountriesForm = Input<typeof UpdateCountriesSchema>;
