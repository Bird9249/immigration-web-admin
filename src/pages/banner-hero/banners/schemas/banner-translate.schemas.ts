import { maxBytes, maxLength, minLength, object, string } from "valibot";

export const BannerTranslateSchemas = object({
    title: string([minLength(1),maxLength(255)]),
    description:string([maxLength(1000)]),    
})