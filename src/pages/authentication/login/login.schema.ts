import { Input, email, maxLength, minLength, object, string } from "valibot";

export const LoginSchema = object({
  email: string([
    email("ອີເມວບໍ່ຖືກຕ້ອງ."),
    minLength(1, "ກະລຸນາໃສ່ອີເມວຂອງທ່ານ."),
    maxLength(30, "ອີເມວຂອງທ່ານຍາວເກີນໄປ."),
  ]),
  password: string([
    minLength(6, "ລະຫັດຜ່ານຂອງທ່ານສັ້ນເກີນໄປ."),
    maxLength(30, "ລະຫັດຜ່ານຂອງທ່ານຍາວເກີນໄປ."),
  ]),
});

export type LoginForm = Input<typeof LoginSchema>;
