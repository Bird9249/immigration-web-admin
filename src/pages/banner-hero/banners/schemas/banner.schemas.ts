import {
    Input,
    array,
    boolean,
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
  } from "valibot";
  
  const isFile = (input: unknown) => input instanceof File;
  
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
    start_time:string([
      minLength(1, "ກະລຸນາປ້ອນວັນທີກ່ອນ.")
    ]),
    end_time:string([
      minLength(1, "ກະລຸນາປ້ອນວັນທີສິນສຸດ.")
    ]),
    title: string([
      minLength(1, "ກະລຸນາປ້ອນວັນທີຂໍ້ມູນກ່ອນ.")
    ]),
    description: string([
      minLength(1, "ກະລຸນາປ້ອນວັນທີຂໍ້ມູນກ່ອນ.")
    ]),
    banners_translate:array(string()),
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
  