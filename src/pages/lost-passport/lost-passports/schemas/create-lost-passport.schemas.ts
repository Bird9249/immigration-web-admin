import { Input, object, omit, tuple } from "valibot";
import { LostPassportTranslateSchemas } from "./lost-passport-translate.schemas";

export const CreateLostPassportSchema = object({
  translates: tuple([
    omit(LostPassportTranslateSchemas, ["id"]),
    omit(LostPassportTranslateSchemas, ["id"]),
    omit(LostPassportTranslateSchemas, ["id"]),
  ]),
});

export type CreateLostPassportSchemaType = Input<
  typeof CreateLostPassportSchema
>;
