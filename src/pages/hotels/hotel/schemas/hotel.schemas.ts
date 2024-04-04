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
} from "valibot";
import { HotelTranslateSchemas } from "./hotel-translate.schemas";

const isFile = (input: unknown) => input instanceof File;

export const HotelSchema = object({
  image: special<File>(isFile, "ຮູບພາບບໍ່ຄວນຫວ່າງເປົ່າ", [
    mimeType(
      ["image/jpeg", "image/png", "image/webp"],
      "ກະລຸນາເລືອກໄຟລ໌ JPEG ຫຼື PNG ຫຼື Webp."
    ),
    maxSize(1024 * 1024 * 10, "ກະລຸນາເລືອກໄຟລ໌ທີ່ນ້ອຍກວ່າ 10 MB."),
  ]),
  latitude: string([minLength(1, "ກະລຸນາປ້ອນຂໍ້ມູນ.")]),
  longitude: string([minLength(1, "ກະລຸນາປ້ອນຂໍ້ມູນ.")]),
  link: string([minLength(1, "ກະລຸນາໃສ່ລິ້ງ.")]),
  phone_number: string([minLength(1, "ກະລຸນາປ້ອນເບີໂທກ່ອນ")]),
  is_published: boolean(),
  lo: HotelTranslateSchemas,
  en: HotelTranslateSchemas,
  zn_CN: HotelTranslateSchemas,
});

export const UpdateHotelSchema = merge([
  omit(HotelSchema, ["image"]),
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

export type HotelForm = Input<typeof HotelSchema>;
export type UpdateHotelForm = Input<typeof UpdateHotelSchema>;
