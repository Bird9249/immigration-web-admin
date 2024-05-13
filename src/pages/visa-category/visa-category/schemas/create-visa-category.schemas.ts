import { Input, object, omit, tuple } from "valibot";
import { VisaCategoryTranslateSchemas } from "./visa-category-translate.schemas";

export const CreateVisaCategorySchema = object({
  translates: tuple([
    omit(VisaCategoryTranslateSchemas, ["id"]),
    omit(VisaCategoryTranslateSchemas, ["id"]),
    omit(VisaCategoryTranslateSchemas, ["id"]),
  ]),
});

export type CreateVisaCategorySchemaType = Input<
  typeof CreateVisaCategorySchema
>;
