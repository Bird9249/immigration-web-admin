import {
  custom,
  Input,
  maxLength,
  minLength,
  number,
  object,
  string,
} from "valibot";
import getJsonStringSize from "../../../../common/utils/get-json-string-size";
import isValidJson from "../../../../common/utils/is-valid-json";

export const ServiceTranslateSchemas = object({
  id: number("ຈະຕ້ອງເປັນ number"),
  title: string("ຈະຕ້ອງເປັນ string", [
    minLength(1, "ຈະຕ້ອງບໍ່ຫວ່າງເປົ່າ."),
    maxLength(255, "ຄວາມຍາວສູງສຸດທີ່ອະນຸຍາດແມ່ນ 255 ຕົວອັກສອນ."),
  ]),
  description: string("ຈະຕ້ອງເປັນ string", [
    maxLength(1000, "ຄວາມຍາວສູງສຸດທີ່ອະນຸຍາດແມ່ນ 1000 ຕົວອັກສອນ."),
  ]),
  content: string("ຈະຕ້ອງເປັນ string.", [
    minLength(1, "ຈະຕ້ອງບໍ່ຫວ່າງເປົ່າ."),
    custom((input) => isValidJson(input), "ຕ້ອງເປັນ string json"),
    custom(
      (input) => getJsonStringSize(input) < 5 * 1024 * 1024,
      "ຂະໜາດຂອງຂໍ້ມູນຕ້ອງບໍ່ເກີນ 5MB"
    ),
  ]),
});

export type ServiceTranslateSchemasType = Input<typeof ServiceTranslateSchemas>;
