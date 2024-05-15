import { Input, object, tuple } from "valibot";
import { CheckpointCategoryTranslateSchemas } from "./checkpoint-category-translate.schema";

export const UpdateCheckpointCategorySchema = object({
  translates: tuple([
    CheckpointCategoryTranslateSchemas,
    CheckpointCategoryTranslateSchemas,
    CheckpointCategoryTranslateSchemas,
  ]),
});

export type UpdateCheckpointCategoryForm = Input<
  typeof UpdateCheckpointCategorySchema
>;
