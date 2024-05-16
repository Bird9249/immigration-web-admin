import { Input, maxLength, minLength, number, object, string } from "valibot";

export const CheckpointCategoryTranslateSchemas = object({
  id: number(),
  title: string([
    minLength(1, "ກະລຸນາປ້ອນຫົວຂໍ້."),
    maxLength(255, "ຫົວຂໍ້ຍາວເກີນໄປ."),
  ]),
  description: string(),
});

export type CheckpointCategoryTranslateFormInput = Input<
  typeof CheckpointCategoryTranslateSchemas
>;
