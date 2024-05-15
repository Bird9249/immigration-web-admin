import { Editor } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { createSignal, onMount, ParentProps } from "solid-js";

type NewsEditorContentProps = ParentProps<{
  content: any;
}>;

export default (props: NewsEditorContentProps) => {
  const [ele, setEle] = createSignal<HTMLDivElement>();

  onMount(() => {
    if (ele()) {
      new Editor({
        element: ele(),
        editable: false,
        content: props.content,
        extensions: [
          StarterKit.configure({
            paragraph: { HTMLAttributes: { class: "text-gray-500" } },
            italic: { HTMLAttributes: { class: "font-italic" } },
            bold: {
              HTMLAttributes: { class: "font-semibold text-gray-900" },
            },
            orderedList: {
              HTMLAttributes: {
                class: "space-y-1 text-gray-500 list-decimal",
              },
            },
            bulletList: {
              HTMLAttributes: {
                class: "space-y-1 text-gray-500 list-disc",
              },
            },
            blockquote: {
              HTMLAttributes: {
                class: "text-xl italic font-semibold text-gray-900",
              },
            },
            horizontalRule: {
              HTMLAttributes: {
                class: "h-px my-8 bg-gray-200 border-0",
              },
            },
          }),
          Underline.configure({ HTMLAttributes: { class: "underline" } }),
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
          Link.configure({
            HTMLAttributes: {
              class: "font-medium text-primary-600 hover:underline",
            },
            openOnClick: "whenNotEditable",
          }),
          Image.configure({
            HTMLAttributes: {
              class: "h-auto max-w-full rounded-lg",
            },
          }),
        ],
      });
    }
  });

  return <div ref={setEle}></div>;
};
