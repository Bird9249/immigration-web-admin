import {
  Input,
  boolean,
  custom,
  email,
  maxSize,
  merge,
  mimeType,
  minLength,
  number,
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
  phone_number: string([minLength(1, "ກະລຸນາປ້ອນເບີໂທກ່ອນ")]),
  is_published: boolean(),
  translates: tuple([
    omit(HotelTranslateSchemas, ["id"]),
    omit(HotelTranslateSchemas, ["id"]),
    omit(HotelTranslateSchemas, ["id"]),
  ]),
  user: optional(
    object({
      email: string("ຈະຕ້ອງບໍ່ຫວ່າງເປົ່າ.", [email("ອີເມວຖືກຈັດຮູບແບບບໍ່ດີ")]),
      password: string("ຈະຕ້ອງບໍ່ຫວ່າງເປົ່າ.", [
        minLength(8, "ຄວາມຍາວຕໍ່າສຸດທີ່ຕ້ອງການແມ່ນ 8 ຕົວອັກສອນ."),
      ]),
    })
  ),
});

export const UpdateHotelSchema = merge([
  omit(HotelSchema, ["image", "translates", "user"]),
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
    user: optional(
      object({
        id: optional(number()),
        email: string("ຈະຕ້ອງບໍ່ຫວ່າງເປົ່າ.", [
          email("ອີເມວຖືກຈັດຮູບແບບບໍ່ດີ"),
        ]),
        password: optional(
          string("ຈະຕ້ອງບໍ່ຫວ່າງເປົ່າ.", [
            custom(
              (input) => (input ? input.length >= 8 : true),
              "ຄວາມຍາວຕໍ່າສຸດທີ່ຕ້ອງການແມ່ນ 8 ຕົວອັກສອນ."
            ),
          ])
        ),
      })
    ),
  }),
]);

export type HotelForm = Input<typeof HotelSchema>;
export type UpdateHotelForm = Input<typeof UpdateHotelSchema>;
