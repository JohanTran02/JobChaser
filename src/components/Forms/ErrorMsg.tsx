import { useFormContext } from "react-hook-form";

export default function ErrorMsg({ id }: { id: string }) {
    const { formState: { errors } } = useFormContext();

    return (
        <>
            {errors[id]?.type && <span className="text-xs text-red-400">{`${errors[id].message}`}</span>}
        </>
    )
}

