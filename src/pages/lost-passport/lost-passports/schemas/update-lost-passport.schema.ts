import { Input, object, tuple } from "valibot";
import { LostPassportTranslateSchemas } from "./lost-passport-translate.schemas";

export const UpdateLostPassportSchema = object({
  translates: tuple([
    LostPassportTranslateSchemas,
    LostPassportTranslateSchemas,
    LostPassportTranslateSchemas,
  ]),
});

export type UpdateLostPassportSchemaType = Input<
  typeof UpdateLostPassportSchema
>;
