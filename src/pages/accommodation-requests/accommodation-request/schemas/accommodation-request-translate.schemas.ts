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

export const AccommodationRequestTranslateSchemas = object({
  id: number("ຈະຕ້ອງເປັນ number"),
  title: string("ຈະຕ້ອງເປັນ string", [
    minLength(1, "ຈະຕ້ອງບໍ່ຫວ່າງເປົ່າ."),
    maxLength(255, "ຄວາມຍາວສູງສຸດທີ່ອະນຸຍາດແມ່ນ 255 ຕົວອັກສອນ."),
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

export type AccommodationRequestTranslateSchemasType = Input<
  typeof AccommodationRequestTranslateSchemas
>;
