import {
  Input,
  array,
  merge,
  minLength,
  object,
  omit,
  string,
  tuple,
} from "valibot";
import { ProvinceTranslateSchemas } from "./province-translates.schemas";

export const ProvincesSchema = object({
  country_ids: array(string([minLength(1, "ກະລຸນາໃສ່ຂໍ້ມູນໄອດີ.")])),
  translates: tuple([
    omit(ProvinceTranslateSchemas, ["id"]),
    omit(ProvinceTranslateSchemas, ["id"]),
    omit(ProvinceTranslateSchemas, ["id"]),
  ]),
});

export const UpdateProvinceSchema = merge([
  omit(ProvincesSchema, ["translates"]),
  object({
    translates: tuple([
      ProvinceTranslateSchemas,
      ProvinceTranslateSchemas,
      ProvinceTranslateSchemas,
    ]),
  }),
]);

export type ProvinceForm = Input<typeof ProvincesSchema>;
export type UpdateProvincesForm = Input<typeof UpdateProvinceSchema>;
