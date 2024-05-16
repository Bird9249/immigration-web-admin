import { Input, object, omit, tuple } from "valibot";
import { CheckpointCategoryTranslateSchemas } from "./checkpoint-category-translate.schema";

export const CreateCheckpointCategorySchema = object({
  translates: tuple([
    omit(CheckpointCategoryTranslateSchemas, ["id"]),
    omit(CheckpointCategoryTranslateSchemas, ["id"]),
    omit(CheckpointCategoryTranslateSchemas, ["id"]),
  ]),
});

export type CreateCheckpointCategoryForm = Input<
  typeof CreateCheckpointCategorySchema
>;
