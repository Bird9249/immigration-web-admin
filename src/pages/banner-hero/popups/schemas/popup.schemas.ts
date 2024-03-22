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
  } from "valibot";
  
  const isFile = (input: unknown) => input instanceof File ;
  
  export const PopupSchema = object({
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
  