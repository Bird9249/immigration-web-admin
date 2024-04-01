import {
    Input,
    boolean,
    email,
    maxLength,
    minLength,
    object,
    
    string,
  } from "valibot";
  
  const isFile = (input: unknown) => input instanceof File;
  
  export const FeedbackSchema = object({
    name: string([
      minLength(1, "ກະລຸນາໃສ່ຊື່ຂອງທ່ານ."),
      maxLength(30, "ຊື່ຂອງທ່ານຍາວເກີນໄປ."),
    ]),
    tel: string([
      minLength(1, "ກະລຸນາໃສ່ນາມສະກຸນຂອງເຈົ້າ."),
      maxLength(30, "ນາມສະກຸນຂອງເຈົ້າຍາວເກີນໄປ."),
    ]),
    email: string([
      minLength(1, "ກະລຸນາໃສ່ອີເມວຂອງທ່ານ."),
      email("ອີເມວຖືກຈັດຮູບແບບບໍ່ດີ."),
      maxLength(30, "ອີເມວຂອງເຈົ້າຍາວເກີນໄປ."),
    ]),
    message: string([
        minLength(1, "ກະລຸນາປ້ອນຂໍ້ຄວາມກ່ອນ")
    ]),
    media:string([
        minLength(1, "ກະລຸນາເລືອກຂໍ້ມູນກ່ອນ")
    ]),
    is_published: boolean(),
  });
  
//   export const UpdateFeedbackSchema = merge([
//     omit(UserSchema, ["image", "password", "confirmPassword"]),
//     object({
//       image: optional(
//         special<File>(isFile, "ຮູບພາບບໍ່ຄວນຫວ່າງເປົ່າ", [
//           mimeType(
//             ["image/jpeg", "image/png", "image/webp"],
//             "ກະລຸນາເລືອກໄຟລ໌ JPEG ຫຼື PNG ຫຼື Webp."
//           ),
//           maxSize(1024 * 1024 * 10, "ກະລຸນາເລືອກໄຟລ໌ທີ່ນ້ອຍກວ່າ 10 MB."),
//         ])
//       ),
//       password: optional(
//         string([
//           minLength(8, "ລະຫັດຜ່ານຂອງທ່ານສັ້ນເກີນໄປ."),
//           maxLength(30, "ລະຫັດຜ່ານຂອງທ່ານຍາວເກີນໄປ."),
//           regex(/[a-z]/, "ລະຫັດຜ່ານຂອງທ່ານຕ້ອງມີຕົວພິມນ້ອຍ."),
//           regex(/[A-Z]/, "ລະຫັດຜ່ານຂອງທ່ານຕ້ອງມີຕົວພິມໃຫຍ່."),
//           regex(/[0-9]/, "ລະຫັດຜ່ານຂອງທ່ານຕ້ອງມີຕົວເລກ."),
//         ])
//       ),
//       confirmPassword: optional(
//         string([
//           minLength(8, "ລະຫັດຜ່ານຂອງທ່ານສັ້ນເກີນໄປ."),
//           maxLength(30, "ລະຫັດຜ່ານຂອງທ່ານຍາວເກີນໄປ."),
//         ])
//       ),
//     }),
//   ]);
  
  export type UserForm = Input<typeof FeedbackSchema>;
//   export type UpdateUserForm = Input<typeof UpdateUserSchema>;
  