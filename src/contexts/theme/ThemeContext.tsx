import {
  ParentProps,
  Signal,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";

const ThemeContext = createContext<Signal<"dark" | "light">>(
  createSignal<"dark" | "light">("light")
);

export const ThemeProvider = (props: ParentProps) => {
  const body = document.body;
  const theme = createSignal<"dark" | "light">("light");

  const localTheme = localStorage.getItem("theme");

  if (localTheme) {
    theme[1](localTheme as "dark" | "light");
  }

  createEffect(() => {
    if (theme[0]() === "dark") {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });

  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}
