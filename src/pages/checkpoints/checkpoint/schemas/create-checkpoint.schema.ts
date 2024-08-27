import {
  array,
  boolean,
  Input,
  maxLength,
  maxSize,
  merge,
  mimeType,
  minLength,
  object,
  omit,
  special,
  string,
  tuple,
} from "valibot";
import { CheckpointTranslateSchema } from "./checkpoint-translate.schema";

const isFile = (input: unknown) => input instanceof File;

export const CreateCheckpointSchema = merge([
  object({
    category_id: array(string("ຕ້ອງເປັນ string"), [
      minLength(1, "ກະລຸນາເລືອກປະເພດດ່ານ"),
    ]),
    province_id: array(string("ຕ້ອງເປັນ string"), [
      minLength(1, "ກະລຸນາເລືອກແຂວງ"),
    ]),
    country: array(string("ຕ້ອງເປັນ string")),
    image: special<File>(isFile, "ຮູບພາບບໍ່ຄວນຫວ່າງເປົ່າ", [
      mimeType(
        ["image/jpeg", "image/png", "image/webp"],
        "ກະລຸນາເລືອກໄຟລ໌ JPEG ຫຼື PNG ຫຼື Webp."
      ),
      maxSize(1024 * 1024 * 10, "ກະລຸນາເລືອກໄຟລ໌ທີ່ນ້ອຍກວ່າ 10 MB."),
    ]),
    link_map: string("ຈະຕ້ອງບໍ່ຫວ່າງເປົ່າ.", [
      minLength(1, "ຈະຕ້ອງບໍ່ຫວ່າງເປົ່າ."),
    ]),
    phone_number: string("ຈະຕ້ອງບໍ່ຫວ່າງເປົ່າ.", [
      maxLength(20, "ບໍ່ສາມາດປ້ອນເບີຫຼາຍກວ່າ 20 ຫຼັກ."),
    ]),
    email: string(),
    visa: boolean(),
    e_visa: boolean(),
  }),
  object({
    translates: tuple([
      omit(CheckpointTranslateSchema, ["id"]),
      omit(CheckpointTranslateSchema, ["id"]),
      omit(CheckpointTranslateSchema, ["id"]),
    ]),
  }),
]);

export type CreateCheckpointForm = Input<typeof CreateCheckpointSchema>;
