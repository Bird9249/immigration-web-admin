import { Editor } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import {
    createEffect,
    createSignal,
    JSXElement,
    onMount,
    Show,
} from "solid-js";
import { createStore } from "solid-js/store";
import Button from "../../button/Button";
import AlignIcon from "../../icons/AlignIcon";
import HeadingIcon from "../../icons/HeadingIcon";
import ImageIcon from "../../icons/ImageIcon";
import LetterIcon from "../../icons/LetterIcon";
import LinkIcon from "../../icons/LinkIcon";
import ListIcon from "../../icons/ListIcon";
import QuoteIcon from "../../icons/QuoteIcon";
import TextSlashIcon from "../../icons/TextSlashIcon";
import Modal from "../../modal/Modal";
import InputText from "../input-text/InputText";

type Props = {
    label: string;
    value: string | undefined;
    error: string;
    required?: boolean;
    onInput: (value: string) => void;
};

const CommandButton = (props: {
    active?: boolean;
    onClick: () => void;
    icon: JSXElement;
    label: string;
}) => {
    return (
        <button
            type="button"
            class="p-2 rounded cursor-pointer transition"
            classList={{
                "text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600":
                    !props.active,
                "text-primary-500 hover:text-primary-900 bg-primary-100 dark:text-primary-400 dark:text-white dark:bg-primary-600 dark:hover:text-white dark:hover:bg-primary-600":
                    props.active,
            }}
            onClick={() => props.onClick()}
        >
            {props.icon}
            <span class="sr-only">{props.label}</span>
        </button>
    );
};

export default (props: Props) => {
    let el!: HTMLDivElement;
    const [editor, setEditor] = createSignal<Editor>();
    const [active, setActive] = createStore({
        bold: false,
        italic: false,
        underline: false,
        strike: false,
        align: {
            left: false,
            center: false,
            right: false,
            justify: false,
        },
        list: {
            ordered: false,
            bullet: false,
        },
        blockquote: false,
        link: false,
        heading: {
            "1": false,
            "2": false,
            "3": false,
            "4": false,
            "5": false,
            "6": false,
        },
    });
    const [linkModal, setLinkModal] = createSignal<boolean>(false);
    const [linkValue, setLinkValue] = createSignal<string>("");
    const [imageOpen, setImageOpen] = createSignal<boolean>(false);

    onMount(() => {
        if (!editor() && el) {
            const _editor = new Editor({
                element: el,
                extensions: [
                    StarterKit.configure({
                        paragraph: { HTMLAttributes: { class: "text-gray-500" } },
                        italic: { HTMLAttributes: { class: "font-italic" } },
                        bold: { HTMLAttributes: { class: "font-semibold text-gray-900" } },
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
                content: props.value ? JSON.parse(props.value) : undefined,
                editorProps: {
                    attributes: {
                        class: "min-h-[60vh] px-4 py-2 bg-white rounded-b-lg",
                    },
                },
            })
                .on("selectionUpdate", (e: { editor: Editor }) => {
                    setActive({
                        bold: e.editor.isActive("bold"),
                        italic: e.editor.isActive("italic"),
                        underline: e.editor.isActive("underline"),
                        strike: e.editor.isActive("strike"),
                        align: {
                            left: e.editor.isActive({ textAlign: "left" }),
                            center: e.editor.isActive({ textAlign: "center" }),
                            right: e.editor.isActive({ textAlign: "right" }),
                            justify: e.editor.isActive({ textAlign: "justify" }),
                        },
                        list: {
                            ordered: e.editor.isActive("orderedList"),
                            bullet: e.editor.isActive("bulletList"),
                        },
                        blockquote: e.editor.isActive("blockquote"),
                        link: e.editor.isActive("link"),
                        heading: {
                            "1": e.editor.isActive("heading", { level: 1 }),
                            "2": e.editor.isActive("heading", { level: 2 }),
                            "3": e.editor.isActive("heading", { level: 3 }),
                            "4": e.editor.isActive("heading", { level: 4 }),
                            "5": e.editor.isActive("heading", { level: 5 }),
                            "6": e.editor.isActive("heading", { level: 6 }),
                        },
                    });
                })
                .on("update", ({ editor }: { editor: Editor }) => {
                    props.onInput(JSON.stringify(editor.getJSON()));
                });

            setEditor(_editor);
        }
    });

    createEffect(() => {
        if (props.value) editor()?.commands.setContent(JSON.parse(props.value));
    });

    function setLink() {
        const prevLink = editor()?.getAttributes("link").href;

        if (prevLink) {
            setLinkValue(prevLink);
        } else {
            setLinkValue("");
        }

        setLinkModal(true);
    }

    return (
        <div>
            <label
                class={`block mb-2 text-sm font-medium  ${props.error ? "text-red-500" : "text-gray-900"
                    } dark:text-white`}
            >
                {props.label} {props.required && <span class="text-red-600">*</span>}
            </label>

            <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div class="flex items-center justify-between p-3  border-b dark:border-gray-600">
                    <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                        <div class="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                            <CommandButton
                                active={active.bold}
                                icon={<LetterIcon iconDirection="bold" class="size-5" />}
                                label="Bold"
                                onClick={() => editor()?.chain().focus().toggleBold().run()}
                            />

                            <CommandButton
                                active={active.italic}
                                icon={<LetterIcon iconDirection="italic" class="size-5" />}
                                label="Italic"
                                onClick={() => editor()?.chain().focus().toggleItalic().run()}
                            />

                            <CommandButton
                                active={active.underline}
                                icon={<LetterIcon iconDirection="underline" class="size-5" />}
                                label="Underline"
                                onClick={() => editor()?.commands.toggleUnderline()}
                            />

                            <CommandButton
                                active={active.strike}
                                icon={<TextSlashIcon class="size-5" />}
                                label="Strike"
                                onClick={() => editor()?.chain().focus().toggleStrike().run()}
                            />
                        </div>

                        <div class="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:pe-4 sm:ps-4">
                            <CommandButton
                                active={active.heading[1]}
                                icon={<HeadingIcon iconDirection="1" class="size-5" />}
                                label="H1"
                                onClick={() =>
                                    editor()?.chain().focus().toggleHeading({ level: 1 }).run()
                                }
                            />

                            <CommandButton
                                active={active.heading[2]}
                                icon={<HeadingIcon iconDirection="2" class="size-5" />}
                                label="H2"
                                onClick={() =>
                                    editor()?.chain().focus().toggleHeading({ level: 2 }).run()
                                }
                            />
                            <CommandButton
                                active={active.heading[3]}
                                icon={<HeadingIcon iconDirection="3" class="size-5" />}
                                label="H3"
                                onClick={() =>
                                    editor()?.chain().focus().toggleHeading({ level: 3 }).run()
                                }
                            />
                            <CommandButton
                                active={active.heading[4]}
                                icon={<HeadingIcon iconDirection="4" class="size-5" />}
                                label="H4"
                                onClick={() =>
                                    editor()?.chain().focus().toggleHeading({ level: 4 }).run()
                                }
                            />
                            <CommandButton
                                active={active.heading[5]}
                                icon={<HeadingIcon iconDirection="5" class="size-5" />}
                                label="H5"
                                onClick={() =>
                                    editor()?.chain().focus().toggleHeading({ level: 5 }).run()
                                }
                            />
                            <CommandButton
                                active={active.heading[6]}
                                icon={<HeadingIcon iconDirection="6" class="size-5" />}
                                label="H6"
                                onClick={() =>
                                    editor()?.chain().focus().toggleHeading({ level: 6 }).run()
                                }
                            />
                        </div>

                        <div class="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:pe-4 sm:ps-4">
                            <CommandButton
                                active={active.align.left}
                                icon={<AlignIcon iconDirection="left" class="size-5" />}
                                label="Align left"
                                onClick={() =>
                                    editor()?.chain().focus().setTextAlign("left").run()
                                }
                            />

                            <CommandButton
                                active={active.align.center}
                                icon={<AlignIcon iconDirection="center" class="size-5" />}
                                label="Align center"
                                onClick={() =>
                                    editor()?.chain().focus().setTextAlign("center").run()
                                }
                            />

                            <CommandButton
                                active={active.align.justify}
                                icon={<AlignIcon iconDirection="justify" class="size-5" />}
                                label="Align justify"
                                onClick={() =>
                                    editor()?.chain().focus().setTextAlign("justify").run()
                                }
                            />

                            <CommandButton
                                active={active.align.right}
                                icon={<AlignIcon iconDirection="right" class="size-5" />}
                                label="Align right"
                                onClick={() =>
                                    editor()?.chain().focus().setTextAlign("right").run()
                                }
                            />
                        </div>

                        <div class="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:pe-4 sm:ps-4">
                            <CommandButton
                                active={active.list.ordered}
                                icon={<ListIcon iconDirection="ordered" class="size-5" />}
                                label="Ordered list"
                                onClick={() =>
                                    editor()?.chain().focus().toggleOrderedList().run()
                                }
                            />

                            <CommandButton
                                active={active.list.bullet}
                                icon={<ListIcon class="size-5" />}
                                label="Bullet list"
                                onClick={() =>
                                    editor()?.chain().focus().toggleBulletList().run()
                                }
                            />
                        </div>

                        <div class="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                            <CommandButton
                                active={active.blockquote}
                                icon={<QuoteIcon class="size-5" />}
                                label="Quote"
                                onClick={() =>
                                    editor()?.chain().focus().toggleBlockquote().run()
                                }
                            />

                            <CommandButton
                                active={active.link}
                                icon={<LinkIcon class="size-5" />}
                                label="Link"
                                onClick={() => setLink()}
                            />

                            <CommandButton
                                icon={<ImageIcon class="size-5" />}
                                label="Image"
                                onClick={() => setImageOpen(true)}
                            />
                        </div>
                    </div>
                </div>

                <div ref={el}></div>

                <Modal
                    open={linkModal()}
                    onOpenChange={({ open }) => setLinkModal(open)}
                >
                    <div class="relative p-4">
                        <form
                            class="flex flex-col gap-3"
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (linkValue() === "") {
                                    editor()
                                        ?.chain()
                                        .focus()
                                        .extendMarkRange("link")
                                        .unsetLink()
                                        .run();

                                    return;
                                }

                                editor()
                                    ?.chain()
                                    .focus()
                                    .extendMarkRange("link")
                                    .setLink({ href: linkValue() })
                                    .run();
                            }}
                        >
                            <InputText
                                placeholder="ປ້ອນລິ້ງ"
                                onInput={(e) => setLinkValue(e.target.value)}
                                value={linkValue()}
                            />
                            <Button color="primary" type="submit">
                                ບັນທຶກ
                            </Button>
                        </form>
                    </div>
                </Modal>
            </div>

            <Show when={props.error}>
                <p class="mt-2 text-sm text-red-500">{props.error}</p>
            </Show>
        </div>
    );
};