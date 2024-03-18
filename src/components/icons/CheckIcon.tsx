import { JSX, Match, ParentProps, Switch } from "solid-js";

interface AngleIconProps
  extends ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>> {
  iconDirection?:
    | "badge"
    | "badge-line"
    | "circle"
    | "circle-line"
    | "plus-circle"
    | "plus-circle-line"
    | "clipboard"
    | "clipboard-line"
    | "file"
    | "file-line"
    | "shield"
    | "shield-line";
}

export default function (props: AngleIconProps) {
  return (
    <>
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill={`${
          !props.iconDirection ||
          props.iconDirection === "badge-line" ||
          props.iconDirection === "circle-line" ||
          props.iconDirection === "plus-circle-line" ||
          props.iconDirection === "clipboard-line" ||
          props.iconDirection === "file-line" ||
          props.iconDirection === "shield-line"
            ? "none"
            : "currentColor"
        }`}
        viewBox="0 0 24 24"
      >
        <Switch
          fallback={
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m5 12 4.7 4.5 9.3-9"
            />
          }
        >
          <Match when={props.iconDirection === "badge"}>
            <path
              fill-rule="evenodd"
              d="M12 2a3 3 0 0 0-2.1.9l-.9.9a1 1 0 0 1-.7.3H7a3 3 0 0 0-3 3v1.2c0 .3 0 .5-.2.7l-1 .9a3 3 0 0 0 0 4.2l1 .9c.2.2.3.4.3.7V17a3 3 0 0 0 3 3h1.2c.3 0 .5 0 .7.2l.9 1a3 3 0 0 0 4.2 0l.9-1c.2-.2.4-.3.7-.3H17a3 3 0 0 0 3-3v-1.2c0-.3 0-.5.2-.7l1-.9a3 3 0 0 0 0-4.2l-1-.9a1 1 0 0 1-.3-.7V7a3 3 0 0 0-3-3h-1.2a1 1 0 0 1-.7-.2l-.9-1A3 3 0 0 0 12 2Zm3.7 7.7a1 1 0 1 0-1.4-1.4L10 12.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l5-5Z"
              clip-rule="evenodd"
            />
          </Match>
          <Match when={props.iconDirection === "badge-line"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m8 12 2 2 5-5m4.5 5.3 1-.9a2 2 0 0 0 0-2.8l-1-.9a2 2 0 0 1-.6-1.4V7a2 2 0 0 0-2-2h-1.2a2 2 0 0 1-1.4-.5l-.9-1a2 2 0 0 0-2.8 0l-.9 1a2 2 0 0 1-1.4.6H7a2 2 0 0 0-2 2v1.2c0 .5-.2 1-.5 1.4l-1 .9a2 2 0 0 0 0 2.8l1 .9c.3.4.6.9.6 1.4V17a2 2 0 0 0 2 2h1.2c.5 0 1 .2 1.4.5l.9 1a2 2 0 0 0 2.8 0l.9-1a2 2 0 0 1 1.4-.6H17a2 2 0 0 0 2-2v-1.2c0-.5.2-1 .5-1.4Z"
            />
          </Match>
          <Match when={props.iconDirection === "circle"}>
            <path
              fill-rule="evenodd"
              d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z"
              clip-rule="evenodd"
            />
          </Match>
          <Match when={props.iconDirection === "circle-line"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </Match>

          <Match when={props.iconDirection === "plus-circle"}>
            <path
              fill-rule="evenodd"
              d="M18 14a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2v-2Z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M15 21.5a10 10 0 1 1 3.6-17L10.9 12 7.7 8.9a1 1 0 0 0-1.4 1.4l4 4a1 1 0 0 0 1.3 0L20 5.8a10 10 0 0 1 1.6 9.1c-.4-.3-1-.5-1.5-.5h-.5V14a2.5 2.5 0 0 0-5 0v.5H14a2.5 2.5 0 0 0 0 5h.5v.5c0 .6.2 1.1.5 1.5Z"
              clip-rule="evenodd"
            />
          </Match>
          <Match when={props.iconDirection === "plus-circle-line"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 21a9 9 0 1 1 3-17.5m-8 6 4 4L19.3 5M17 14v6m-3-3h6"
            />
          </Match>

          <Match when={props.iconDirection === "clipboard"}>
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2c0-.6-.4-1-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.7 8.7a1 1 0 0 0-1.4-1.4L11 14.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l4-4Z"
              clip-rule="evenodd"
            />
          </Match>
          <Match when={props.iconDirection === "clipboard-line"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 4h3c.6 0 1 .4 1 1v15c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V5c0-.6.4-1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z"
            />
          </Match>

          <Match when={props.iconDirection === "file"}>
            <path d="M9 7V2.2a2 2 0 0 0-.5.4l-4 3.9a2 2 0 0 0-.3.5H9Z" />
            <path
              fill-rule="evenodd"
              d="M11 7V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm4.7 5.7a1 1 0 0 0-1.4-1.4L11 14.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l4-4Z"
              clip-rule="evenodd"
            />
          </Match>
          <Match when={props.iconDirection === "file-line"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 3v4c0 .6-.4 1-1 1H5m4 6 2 2 4-4m4-8v16c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1Z"
            />
          </Match>
          <Match when={props.iconDirection === "shield"}>
            <path
              fill-rule="evenodd"
              d="M11.6 3h.8l7 2.7c.3.2.6.6.6 1a17.7 17.7 0 0 1-7.4 14.1 1 1 0 0 1-1.2 0A17.4 17.4 0 0 1 4 6.7c0-.4.3-.8.6-1l7-2.6Zm4 7.3a1 1 0 0 0-1.3-1.6l-3.3 3-.8-1a1 1 0 0 0-1.4 1.5l1.5 1.5c.4.4 1 .4 1.4 0l4-3.4Z"
              clip-rule="evenodd"
            />
          </Match>
          <Match when={props.iconDirection === "shield-line"}>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.5 11.5 11 13l4-3.5M12 20A16.4 16.4 0 0 1 5 6.7L12 4l7 2.7A16.7 16.7 0 0 1 12 20Z"
            />
          </Match>
        </Switch>
      </svg>
    </>
  );
}
