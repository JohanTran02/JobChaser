import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
    email: string;
    password: string;
}

export default function Form({ sign, formAction }: { sign: string, formAction: SubmitHandler<IFormInput> }) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>();

    return (
        <>
            <form onSubmit={handleSubmit(formAction)} className="m-auto w-1/3 flex flex-col justify-center content-center">
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" placeholder="Email" className="text-black"
                    {...register("email",
                        {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email adress"
                            }
                        })} />
                {errors.email && (<span className="text-red-500">{errors.email.message}</span>)}
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" placeholder="Password" className="text-black"
                    {...register("password",
                        {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            }
                        })} />
                {errors.password && (<span className="text-red-500">{errors.password.message}</span>)}
                <button type="submit" className="bg-blue-400">{sign}</button>
            </form>
        </>
    )
}
