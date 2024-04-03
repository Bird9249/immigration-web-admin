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
  message: string([minLength(1, "ກະລຸນາປ້ອນຂໍ້ຄວາມກ່ອນ")]),
  media: string([minLength(1, "ກະລຸນາເລືອກຂໍ້ມູນກ່ອນ")]),
  is_published: boolean(),
});

export type UserForm = Input<typeof FeedbackSchema>;
