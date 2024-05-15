import {} from "@modular-forms/solid";
import { maxLength, minLength, number, object, string } from "valibot";

export const CheckpointTranslateSchema = object({
  id: number(),
  name: string([minLength(1, "ກະລຸນາປ້ອນຊື່ດ່ານ"), maxLength(255)]),
  content: string(),
  address: string(),
});
