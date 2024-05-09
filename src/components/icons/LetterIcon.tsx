import { JSX, Match, ParentProps, Switch } from "solid-js";

interface IconProps extends ParentProps<JSX.SvgSVGAttributes<SVGSVGElement>> {
    iconDirection: "bold" | "italic" | "underline";
}

export default function (props: IconProps) {
    return (
        <>
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <Switch>
                    <Match when={props.iconDirection === "bold"}>
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6"
                        />
                    </Match>
                    <Match when={props.iconDirection === "italic"}>
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m8.874 19 6.143-14M6 19h6.33m-.66-14H18"
                        />
                    </Match>
                    <Match when={props.iconDirection === "underline"}>
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-width="2"
                            d="M6 19h12M8 5v9a4 4 0 0 0 8 0V5M6 5h4m4 0h4"
                        />
                    </Match>
                </Switch>
            </svg>
        </>
    );
}