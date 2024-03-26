import {
    Input,
    array,
    boolean,
    custom,
    maxLength,
    maxSize,
    merge,
    mimeType,
    minLength,
    number,
    object,
    omit,
    optional,
    regex,
    special,
    string,
    tuple,
  } from "valibot";
import { BannerTranslateSchemas } from "./banner-translate.schemas";
  
  const isFile = (input: unknown) => input instanceof File ;
  
  export const BannerSchema = object({
    image: special<File>(isFile, "ຮູບພາບບໍ່ຄວນຫວ່າງເປົ່າ", [
      mimeType(
        ["image/jpeg", "image/png", "image/webp"],
        "ກະລຸນາເລືອກໄຟລ໌ JPEG ຫຼື PNG ຫຼື Webp."
      ),
      maxSize(1024 * 1024 * 10, "ກະລຸນາເລືອກໄຟລ໌ທີ່ນ້ອຍກວ່າ 10 MB."),
    ]),
    link: string([
      minLength(1, "ກະລຸນາໃສ່Link.")
    ]),
    is_private:boolean(),
    duration:tuple([string(), string()]),
    lo:BannerTranslateSchemas,
    en:BannerTranslateSchemas,
    zh_CN:BannerTranslateSchemas,
  });
  
  export const UpdateBannerSchema = merge([
    omit(BannerSchema, ["image"]),
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
  export type BannerForm = Input<typeof BannerSchema>;
  export type UpdateBannerForm = Input<typeof UpdateBannerSchema>;
  