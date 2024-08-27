import {
  Input,
  array,
  maxLength,
  maxSize,
  merge,
  mimeType,
  minLength,
  object,
  omit,
  optional,
  special,
  string,
  tuple,
} from "valibot";
import { NewTranslateSchemas } from "./news-translate.schemas";
const isFile = (input: unknown) => input instanceof File;
export const NewSchema = object({
  thumbnail: special<File>(isFile, "ຮູບພາບບໍ່ຄວນຫວ່າງເປົ່າ", [
    mimeType(
      ["image/jpeg", "image/png", "image/webp"],
      "ກະລຸນາເລືອກໄຟລ໌ JPEG ຫຼື PNG ຫຼື Webp."
    ),
    maxSize(1024 * 1024 * 10, "ກະລຸນາເລືອກໄຟລ໌ທີ່ນ້ອຍກວ່າ 10 MB."),
  ]),
  category_id: array(string([minLength(1, "ກະລຸນາໃສ່ຂໍ້ມູນໄອດີ.")])),
  status: array(
    string([
      minLength(1, "ກະລຸນາໃສ່ຂໍ້ມູນ."),
      maxLength(30, "ຂໍ້ມູນຍາວເກີນໄປ."),
    ]),
    [minLength(1, "ກະລຸນາເລືອກສະຖານະ")]
  ),
  translates: tuple([
    omit(NewTranslateSchemas, ["id"]),
    omit(NewTranslateSchemas, ["id"]),
    omit(NewTranslateSchemas, ["id"]),
  ]),
});

export const UpdateNewsSchema = merge([
  omit(NewSchema, ["translates", "thumbnail"]),
  object({
    thumbnail: optional(
      special<File>(isFile, "ຮູບພາບບໍ່ຄວນຫວ່າງເປົ່າ", [
        mimeType(
          ["image/jpeg", "image/png", "image/webp"],
          "ກະລຸນາເລືອກໄຟລ໌ JPEG ຫຼື PNG ຫຼື Webp."
        ),
        maxSize(1024 * 1024 * 10, "ກະລຸນາເລືອກໄຟລ໌ທີ່ນ້ອຍກວ່າ 10 MB."),
      ])
    ),
    translates: tuple([
      NewTranslateSchemas,
      NewTranslateSchemas,
      NewTranslateSchemas,
    ]),
  }),
]);

export type NewsForm = Input<typeof NewSchema>;
export type UpdateNewsForm = Input<typeof UpdateNewsSchema>;
