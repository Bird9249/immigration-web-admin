import {
  Input,
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
} from "valibot";

const isFile = (input: unknown) => input instanceof File;

export const LawSchema = object({
  file: special<File>(isFile, "ຮູບພາບບໍ່ຄວນຫວ່າງເປົ່າ", [
    mimeType(["application/pdf"], "ກະລຸນາເລືອກໄຟລ໌ PDF."),
    maxSize(1024 * 1024 * 100, "ກະລຸນາເລືອກໄຟລ໌ທີ່ນ້ອຍກວ່າ 100 MB."),
  ]),
  name: string([
    minLength(1, "ກະລຸນາໃສ່ຊື່ຂອງທ່ານ."),
    maxLength(30, "ຊື່ຂອງທ່ານຍາວເກີນໄປ."),
  ]),
});

export const UpdateLawSchema = merge([
  omit(LawSchema, ["file"]),
  object({
    file: optional(
      special<File>(isFile, "ຮູບພາບບໍ່ຄວນຫວ່າງເປົ່າ", [
        mimeType(["application/pdf"], "ກະລຸນາເລືອກໄຟລ໌ PDF."),
        maxSize(1024 * 1024 * 100, "ກະລຸນາເລືອກໄຟລ໌ທີ່ນ້ອຍກວ່າ 100 MB."),
      ])
    ),
  }),
]);

export type LawForm = Input<typeof LawSchema>;
export type UpdateLawForm = Input<typeof UpdateLawSchema>;
