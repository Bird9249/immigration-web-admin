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
  link: string([minLength(1, "ກະລຸນາໃສ່ລິ້ງ.")]),
  map_link: string([minLength(1, "ກະລຸນາໃສ່ລິ້ງ.")]),
  phone_number: string([minLength(1, "ກະລຸນາປ້ອນເບີໂທກ່ອນ")]),
  is_published: boolean(),
  translates: tuple([
    omit(HotelTranslateSchemas, ["id"]),
    omit(HotelTranslateSchemas, ["id"]),
    omit(HotelTranslateSchemas, ["id"]),
  ]),
});

export const UpdateHotelSchema = merge([
  omit(HotelSchema, ["image", "translates"]),
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
      HotelTranslateSchemas,
      HotelTranslateSchemas,
      HotelTranslateSchemas,
    ]),
  }),
]);

export type HotelForm = Input<typeof HotelSchema>;
export type UpdateHotelForm = Input<typeof UpdateHotelSchema>;
