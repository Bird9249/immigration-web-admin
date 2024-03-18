import { Output, array, maxLength, minLength, object, string } from "valibot";

export const RoleSchema = object({
  name: string([
    minLength(1, "ກະລຸນາໃສ່ຊື່ຂອງທ່ານ."),
    maxLength(30, "ຊື່ຂອງເຈົ້າຍາວເກີນໄປ."),
  ]),
  description: string([
    minLength(1, "ກະລຸນາໃສ່ຄຳອະທິຂອງທ່ານ."),
    maxLength(1000, "ຄຳອະທິບາຍຂອງເຈົ້າຍາວເກີນໄປ."),
  ]),
  permissions: array(string()),
});

export type RoleForm = Output<typeof RoleSchema>;
