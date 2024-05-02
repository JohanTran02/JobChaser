import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Input from "./Input";

interface IFormInput {
    email: string;
    password: string;
}

export default function Form() {
    const methods = useForm<IFormInput>();
    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

    return (
        <>
            <FormProvider {...methods}>
                <form noValidate onSubmit={e => e.preventDefault()} className={`container`}>
                    <div className="container mt-5 text-center">
                        <div className={`grid gap-5 md:grid-cols-2`}>
                            <Input
                                label="name"
                                type="text"
                                id="name"
                                placeholder="type your name..."
                            />
                            <Input
                                label="email"
                                type="email"
                                id="email"
                                placeholder="type your email..."
                            />
                            <Input
                                label="password"
                                type="password"
                                id="password"
                                placeholder="type your password..."
                            />
                            <button type="submit" className="bg-red-500 rounded" onClick={handleSubmit(onSubmit)}>Log in</button>
                        </div>
                    </div>
                </form>
            </FormProvider>

            {/* <form onSubmit={handleSubmit(formAction)} className="m-auto w-1/3 flex flex-col justify-center content-center">
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
            </form> */}
        </>
    )
}
