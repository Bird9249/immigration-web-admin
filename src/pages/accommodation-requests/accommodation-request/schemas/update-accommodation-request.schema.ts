import { Input, object, tuple } from "valibot";
import { AccommodationRequestTranslateSchemas } from "./accommodation-request-translate.schemas";

export const UpdateAccommodationRequestSchema = object({
  translates: tuple([
    AccommodationRequestTranslateSchemas,
    AccommodationRequestTranslateSchemas,
    AccommodationRequestTranslateSchemas,
  ]),
});

export type UpdateAccommodationRequestSchemaType = Input<
  typeof UpdateAccommodationRequestSchema
>;
