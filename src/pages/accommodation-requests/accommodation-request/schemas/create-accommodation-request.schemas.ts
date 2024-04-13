import { Input, object, omit, tuple } from "valibot";
import { AccommodationRequestTranslateSchemas } from "./accommodation-request-translate.schemas";

export const CreateAccommodationRequestSchema = object({
  translates: tuple([
    omit(AccommodationRequestTranslateSchemas, ["id"]),
    omit(AccommodationRequestTranslateSchemas, ["id"]),
    omit(AccommodationRequestTranslateSchemas, ["id"]),
  ]),
});

export type CreateAccommodationRequestSchemaType = Input<
  typeof CreateAccommodationRequestSchema
>;
