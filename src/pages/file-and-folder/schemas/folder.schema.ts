import { Input, maxLength, minLength, object, string } from "valibot";

export const FolderSchema = object({
  name: string([
    minLength(1, "ກະລຸນາປ້ອນຊື່ໂຟນເດີ."),
    maxLength(255, "ຊື່ໂຟນເດີຍາວເກີນໄປ."),
  ]),
});

export type FolderSchemaType = Input<typeof FolderSchema>;
