import { Input, merge, object, omit } from "valibot";
import { AccommodationRequestTranslateSchemas } from "./accommodation_request_translate.schemas";

export const AccommodationRequestSchema = object({
  lo: AccommodationRequestTranslateSchemas,
  en: AccommodationRequestTranslateSchemas,
  zh_CN: AccommodationRequestTranslateSchemas,
});

// export const UpdateAccommodationRequestSchema = merge([
//   omit([AccommodationRequestSchema]),
// ]);
export type AccommodationRequestForm = Input<typeof AccommodationRequestSchema>;
export type UpdateAccommodationRequestForm = Input<
  typeof AccommodationRequestSchema
>;
