import {
  Input,
  boolean,
  maxSize,
  merge,
  mimeType,
  object,
  omit,
  optional,
  special,
  string,
  tuple,
} from "valibot";
import { BannerTranslateSchemas } from "./banner-translate.schemas";

const isFile = (input: unknown) => input instanceof File;

export const BannerSchema = object({
  image: special<File>(isFile, "ຮູບພາບບໍ່ຄວນຫວ່າງເປົ່າ", [
    mimeType(
      ["image/jpeg", "image/png", "image/webp"],
      "ກະລຸນາເລືອກໄຟລ໌ JPEG ຫຼື PNG ຫຼື Webp."
    ),
    maxSize(1024 * 1024 * 10, "ກະລຸນາເລືອກໄຟລ໌ທີ່ນ້ອຍກວ່າ 10 MB."),
  ]),
  link: string(),
  is_private: boolean(),
  duration: tuple([string(), string()], "ກະລຸນາເລືອກວັນທີ່"),
  translates: tuple([
    omit(BannerTranslateSchemas, ["id"]),
    omit(BannerTranslateSchemas, ["id"]),
    omit(BannerTranslateSchemas, ["id"]),
  ]),
});

export const UpdateBannerSchema = merge([
  omit(BannerSchema, ["image", "translates"]),
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
      BannerTranslateSchemas,
      BannerTranslateSchemas,
      BannerTranslateSchemas,
    ]),
  }),
]);

export type BannerForm = Input<typeof BannerSchema>;
export type UpdateBannerForm = Input<typeof UpdateBannerSchema>;
