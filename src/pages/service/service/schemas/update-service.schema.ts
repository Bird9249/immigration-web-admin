import { Input, object, tuple } from "valibot";
import { ServiceTranslateSchemas } from "./service-translate.schemas";

export const UpdateServiceSchema = object({
  translates: tuple([
    ServiceTranslateSchemas,
    ServiceTranslateSchemas,
    ServiceTranslateSchemas,
  ]),
});

export type UpdateServiceSchemaType = Input<typeof UpdateServiceSchema>;
