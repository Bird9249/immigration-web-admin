import { Input, object, omit, tuple } from "valibot";
import { ServiceTranslateSchemas } from "./service-translate.schemas";

export const CreateServiceSchema = object({
  translates: tuple([
    omit(ServiceTranslateSchemas, ["id"]),
    omit(ServiceTranslateSchemas, ["id"]),
    omit(ServiceTranslateSchemas, ["id"]),
  ]),
});

export type CreateServiceSchemaType = Input<typeof CreateServiceSchema>;
