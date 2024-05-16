import {
  Input,
  maxSize,
  merge,
  mimeType,
  object,
  omit,
  optional,
  special,
  tuple,
} from "valibot";
import { CheckpointTranslateSchema } from "./checkpoint-translate.schema";
import { CreateCheckpointSchema } from "./create-checkpoint.schema";

const isFile = (input: unknown) => input instanceof File;

export const UpdateCheckpointSchema = merge([
  omit(CreateCheckpointSchema, ["translates", "image"]),
  object({
    image: optional(
      special<File>(isFile, "ຮູບພາບບໍ່ຄວນຫວ່າງເປົ່າ", [
        mimeType(
          ["image/jpeg", "image/png", "image/webp"],
          "ກະລຸນາເລືອກໄຟລ໌ JPEG ຫຼື PNG ຫຼື Webp."
        ),
        maxSize(1024 * 1024 * 10, "ກະລຸນາເລືອກໄຟລ໌ທີ່ນ້ອຍກວ່າ 10 MB."),
      ])
    ),
    translates: tuple([
      CheckpointTranslateSchema,
      CheckpointTranslateSchema,
      CheckpointTranslateSchema,
    ]),
  }),
]);

export type UpdateCheckpointForm = Input<typeof UpdateCheckpointSchema>;
