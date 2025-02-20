import { createContext } from "react";

export interface ThemeType{
    theme: "light" | "dark";
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeType | undefined>(undefined);