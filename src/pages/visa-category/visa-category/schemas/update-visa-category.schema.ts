import { Input, object, tuple } from "valibot";
import { VisaCategoryTranslateSchemas } from "./visa-category-translate.schemas";

export const UpdateVisaCategorySchema = object({
  translates: tuple([
    VisaCategoryTranslateSchemas,
    VisaCategoryTranslateSchemas,
    VisaCategoryTranslateSchemas,
  ]),
});

export type UpdateVisaCategorySchemaType = Input<
  typeof UpdateVisaCategorySchema
>;
