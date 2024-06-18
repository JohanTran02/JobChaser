import { useContext } from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { ThemeContext } from "../../context/ThemeContext";
import ErrorMsg from "./ErrorMsg";
import { optionPatterns } from "../../Features/Form/formFeatures";
import { Pattern } from "../../job.d";

export default function Input({ label, type, id, placeholder, pattern }:
    {
        label: string,
        type: string,
        id: string,
        placeholder: string,
        pattern: Pattern
    }) {
    const { register } = useFormContext();
    const errorHandler = optionPatterns(id, pattern) as RegisterOptions<FieldValues, string>;

    let theme = useContext(ThemeContext);

    theme = theme.includes("dark") ?
        "dark:bg-slate-600 dark:placeholder-white" :
        "bg-slate-300 placeholder-black";

    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between">
                <label htmlFor={id} className="font-semibold capitalize">
                    {label}
                </label>
            </div>
            <input
                id={id}
                type={type}
                {...register(id, errorHandler)}
                className={`${theme} w-full p-5 font-medium border rounded-md placeholder:opacity-60`}
                placeholder={placeholder}
            />
            <ErrorMsg id={id} />
        </div>
    )
}