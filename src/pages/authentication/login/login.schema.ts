import {
  Input,
  email,
  maxLength,
  minLength,
  object,
  regex,
  string,
} from "valibot";

export const LoginSchema = object({
  email: string([
    email("ອີເມວບໍ່ຖືກຕ້ອງ."),
    minLength(1, "ກະລຸນາໃສ່ອີເມວຂອງທ່ານ."),
    maxLength(30, "ອີເມວຂອງທ່ານຍາວເກີນໄປ."),
  ]),
  password: string([
    minLength(6, "ລະຫັດຜ່ານຂອງທ່ານສັ້ນເກີນໄປ."),
    maxLength(30, "ລະຫັດຜ່ານຂອງທ່ານຍາວເກີນໄປ."),
    regex(/[a-z]/, "ລະຫັດຜ່ານຂອງທ່ານຕ້ອງມີຕົວພິມນ້ອຍ."),
    regex(/[A-Z]/, "ລະຫັດຜ່ານຂອງທ່ານຕ້ອງມີຕົວພິມໃຫຍ່."),
    // regex(/[0-9]/, "ລະຫັດຜ່ານຂອງທ່ານຕ້ອງມີຕົວເລກ."),
  ]),
});

export type LoginForm = Input<typeof LoginSchema>;
