import {
  Input,
  boolean,
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

const isFile = (input: unknown) => input instanceof File;

export const PopupSchema = object({
  image: special<File>(isFile, "ຮູບພາບບໍ່ຄວນຫວ່າງເປົ່າ", [
    mimeType(
      ["image/jpeg", "image/png", "image/webp"],
      "ກະລຸນາເລືອກໄຟລ໌ JPEG ຫຼື PNG ຫຼື Webp."
    ),
    maxSize(1024 * 1024 * 10, "ກະລຸນາເລືອກໄຟລ໌ທີ່ນ້ອຍກວ່າ 10 MB."),
  ]),
  link: string(),
  is_public: boolean(),
  duration: tuple(
    [
      string("ຕ້ອງເປັນ string", [minLength(1, "ກະລຸນາເລືອກວັນທີ")]),
      string("ຕ້ອງເປັນ string", [minLength(1, "ກະລຸນາເລືອກວັນທີ")]),
    ],
    "ກະລຸນາເລືອກວັນທີ"
  ),
});

export const UpdatePopupSchema = merge([
  omit(PopupSchema, ["image"]),
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
  }),
]);
export type PopupForm = Input<typeof PopupSchema>;
export type UpdatePopupForm = Input<typeof UpdatePopupSchema>;
