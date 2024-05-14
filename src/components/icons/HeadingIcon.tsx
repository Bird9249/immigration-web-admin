import { JSX, Match, ParentProps, Switch } from "solid-js";

interface IconProps extends ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>> {
  iconDirection: "1" | "2" | "3" | "4" | "5" | "6";
}

export default function (props: IconProps) {
  return (
    <>
      <Switch>
        <Match when={props.iconDirection === "1"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 12h8" />
            <path d="M4 18V6" />
            <path d="M12 18V6" />
            <path d="m17 12 3-2v8" />
          </svg>
        </Match>
        <Match when={props.iconDirection === "2"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 12h8" />
            <path d="M4 18V6" />
            <path d="M12 18V6" />
            <path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1" />
          </svg>
        </Match>
        <Match when={props.iconDirection === "3"}>
          <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 12h8" />
            <path d="M4 18V6" />
            <path d="M12 18V6" />
            <path d="M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2" />
            <path d="M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2" />
          </svg>
        </Match>
        <Match when={props.iconDirection === "4"}>
          <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 12h8" />
            <path d="M4 18V6" />
            <path d="M12 18V6" />
            <path d="M17 10v4h4" />
            <path d="M21 10v8" />
          </svg>
        </Match>
        <Match when={props.iconDirection === "5"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 12h8" />
            <path d="M4 18V6" />
            <path d="M12 18V6" />
            <path d="M17 13v-3h4" />
            <path d="M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17" />
          </svg>
        </Match>
        <Match when={props.iconDirection === "6"}>
          <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 12h8" />
            <path d="M4 18V6" />
            <path d="M12 18V6" />
            <circle cx="19" cy="16" r="2" />
            <path d="M20 10c-2 2-3 3.5-3 6" />
          </svg>
        </Match>
      </Switch>
    </>
  );
}
