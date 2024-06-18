import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { IFormInput, Pattern } from "../../job.d";


export default function Form({ pattern, submitHandler }: { pattern: Pattern, submitHandler: SubmitHandler<IFormInput> }) {
    const methods = useForm<IFormInput>();
    const { handleSubmit } = methods;

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className={`grid gap-5`}>
                        <Input
                            label="email"
                            type="email"
                            id="email"
                            placeholder="type your email..."
                            pattern={pattern}
                        />
                        <Input
                            label="password"
                            type="password"
                            id="password"
                            placeholder="type your password..."
                            pattern={pattern}
                        />
                        <button type="submit" className="bg-blue-400 rounded p-3 max-w-48 mx-auto w-full">{pattern}</button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
