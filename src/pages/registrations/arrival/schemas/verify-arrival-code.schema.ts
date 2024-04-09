import { Input, maxLength, minLength, object, string } from "valibot";

export const VerifyArrivalCodeSchema = object({
  verification_code: string("ຕ້ອງເປັນ string", [
    minLength(1, "ຕ້ອງບໍ່ວ່າງເປົ່າ"),
    maxLength(10, "ຕົວອັກສອນຕ້ອງບໍ່ເກີນ 10"),
  ]),
});

export type VerifyArrivalCodeSchemaType = Input<typeof VerifyArrivalCodeSchema>;
