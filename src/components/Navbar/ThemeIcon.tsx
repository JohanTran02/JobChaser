import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function ThemeIcon() {
    const theme = useContext(ThemeContext);

    return (
        theme.includes("dark") ? <MoonIcon /> : <SunIcon />
    )
}