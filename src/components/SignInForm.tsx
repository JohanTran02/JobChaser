import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
    email: string;
}

export default function SignInForm() {
    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email"
                    {...register("email",
                        {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email adress"
                            }
                        })} />
                <button type="submit" className="bg-blue-400">Sign In</button>
            </form>
        </>
    )
}
