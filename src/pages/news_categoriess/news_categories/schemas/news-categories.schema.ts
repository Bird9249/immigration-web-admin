import { Input, merge, object, omit, tuple } from "valibot";
import { NewCataegoriessTranslateSchemas } from "./news-categories-translate.schemas";

export const NewCataegoriessSchema = object({
  translates: tuple([
    omit(NewCataegoriessTranslateSchemas, ["id"]),
    omit(NewCataegoriessTranslateSchemas, ["id"]),
    omit(NewCataegoriessTranslateSchemas, ["id"]),
  ]),
});

export const UpdateNewCataegoriessSchema = merge([
  omit(NewCataegoriessSchema, ["translates"]),
  object({
    translates: tuple([
      NewCataegoriessTranslateSchemas,
      NewCataegoriessTranslateSchemas,
      NewCataegoriessTranslateSchemas,
    ]),
  }),
]);

export type NewCataegoriessForm = Input<typeof NewCataegoriessSchema>;
export type UpdateNewCataegoriessForm = Input<
  typeof UpdateNewCataegoriessSchema
>;
