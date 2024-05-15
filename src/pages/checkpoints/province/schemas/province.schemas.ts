import { Input, merge, object, omit, tuple } from "valibot";
import { ProvinceTranslateSchemas } from "./province-translates.schemas";

export const ProvincesSchema = object({
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
