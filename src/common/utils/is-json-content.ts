import { JSONContent } from "@tiptap/core";

export default (data: any): data is JSONContent =>
  typeof data === "object" &&
  typeof data.type === "string" &&
  (typeof data.attrs === "undefined" || typeof data.attrs === "object") &&
  (typeof data.content === "undefined" || Array.isArray(data.content)) &&
  (typeof data.marks === "undefined" || Array.isArray(data.marks)) &&
  (typeof data.text === "undefined" || typeof data.text === "string");
