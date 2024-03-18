import {
  Input,
  array,
  email,
  maxLength,
  maxSize,
  merge,
  mimeType,
  minLength,
  object,
  omit,
  optional,
  regex,
  special,
  string,
} from "valibot";

const isFile = (input: unknown) => input instanceof File;

export const UserSchema = object({
  image: special<File>(isFile, "ຮູບພາບບໍ່ຄວນຫວ່າງເປົ່າ", [
    mimeType(
      ["image/jpeg", "image/png", "image/webp"],
      "ກະລຸນາເລືອກໄຟລ໌ JPEG ຫຼື PNG ຫຼື Webp."
    ),
    maxSize(1024 * 1024 * 10, "ກະລຸນາເລືອກໄຟລ໌ທີ່ນ້ອຍກວ່າ 10 MB."),
  ]),
  firstName: string([
    minLength(1, "ກະລຸນາໃສ່ຊື່ຂອງທ່ານ."),
    maxLength(30, "ຊື່ຂອງທ່ານຍາວເກີນໄປ."),
  ]),
  lastName: string([
    minLength(1, "ກະລຸນາໃສ່ນາມສະກຸນຂອງເຈົ້າ."),
    maxLength(30, "ນາມສະກຸນຂອງເຈົ້າຍາວເກີນໄປ."),
  ]),
  email: string([
    minLength(1, "ກະລຸນາໃສ່ອີເມວຂອງທ່ານ."),
    email("ອີເມວຖືກຈັດຮູບແບບບໍ່ດີ."),
    maxLength(30, "ອີເມວຂອງເຈົ້າຍາວເກີນໄປ."),
  ]),
  roles: array(string()),
  password: string([
    minLength(8, "ລະຫັດຜ່ານຂອງທ່ານສັ້ນເກີນໄປ."),
    maxLength(30, "ລະຫັດຜ່ານຂອງທ່ານຍາວເກີນໄປ."),
    regex(/[a-z]/, "ລະຫັດຜ່ານຂອງທ່ານຕ້ອງມີຕົວພິມນ້ອຍ."),
    regex(/[A-Z]/, "ລະຫັດຜ່ານຂອງທ່ານຕ້ອງມີຕົວພິມໃຫຍ່."),
    regex(/[0-9]/, "ລະຫັດຜ່ານຂອງທ່ານຕ້ອງມີຕົວເລກ."),
  ]),
  confirmPassword: string([
    minLength(8, "ລະຫັດຜ່ານຂອງທ່ານສັ້ນເກີນໄປ."),
    maxLength(30, "ລະຫັດຜ່ານຂອງທ່ານຍາວເກີນໄປ."),
  ]),
});

export const UpdateUserSchema = merge([
  omit(UserSchema, ["image", "password", "confirmPassword"]),
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
    password: optional(
      string([
        minLength(8, "ລະຫັດຜ່ານຂອງທ່ານສັ້ນເກີນໄປ."),
        maxLength(30, "ລະຫັດຜ່ານຂອງທ່ານຍາວເກີນໄປ."),
        regex(/[a-z]/, "ລະຫັດຜ່ານຂອງທ່ານຕ້ອງມີຕົວພິມນ້ອຍ."),
        regex(/[A-Z]/, "ລະຫັດຜ່ານຂອງທ່ານຕ້ອງມີຕົວພິມໃຫຍ່."),
        regex(/[0-9]/, "ລະຫັດຜ່ານຂອງທ່ານຕ້ອງມີຕົວເລກ."),
      ])
    ),
    confirmPassword: optional(
      string([
        minLength(8, "ລະຫັດຜ່ານຂອງທ່ານສັ້ນເກີນໄປ."),
        maxLength(30, "ລະຫັດຜ່ານຂອງທ່ານຍາວເກີນໄປ."),
      ])
    ),
  }),
]);

export type UserForm = Input<typeof UserSchema>;
export type UpdateUserForm = Input<typeof UpdateUserSchema>;
