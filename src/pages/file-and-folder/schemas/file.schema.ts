import { Input, maxSize, mimeType, object, special } from "valibot";

export const FileSchema = object({
  file: special<File>(
    (input: unknown) => input instanceof File,
    "ຮູບພາບບໍ່ຄວນຫວ່າງເປົ່າ",
    [
      mimeType(
        ["image/jpeg", "image/png", "image/webp"],
        "ກະລຸນາເລືອກໄຟລ໌ JPEG ຫຼື PNG ຫຼື Webp."
      ),
      maxSize(1024 * 1024 * 10, "ກະລຸນາເລືອກໄຟລ໌ທີ່ນ້ອຍກວ່າ 10 MB."),
    ]
  ),
});

export type FileSchemaType = Input<typeof FileSchema>;
