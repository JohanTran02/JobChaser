import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import Input from "./Input";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import XCircleIcon from "@heroicons/react/24/outline/esm/XCircleIcon";

interface IFormInput {
    email: string;
    password: string;
}

export default function Form() {
    const methods = useForm<IFormInput>();
    const { handleSubmit } = methods;
    const navigate = useNavigate();
    const [errorModal, setErrorModal] = useState<boolean>(false);

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const { email, password } = data;
        signInWithEmailAndPassword(auth, email, password).
            then(() => {
                navigate("/JobChaser/Jobs");
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`${errorCode} : ${errorMessage}`)
                setErrorModal(true);
            });
    };

    return (
        <>
            <FormProvider {...methods}>
                <form noValidate onSubmit={e => e.preventDefault()} className={`container mx-auto px-5 max-w-96`}>
                    <div className={`grid gap-5`}>
                        {errorModal &&
                            <div className="bg-red-300 p-4 border-red-500 relative">
                                <p className="text-red-800">Incorrect username or password.</p>
                                <XCircleIcon className="h-6 w-6 absolute right-0 top-0 cursor-pointer" onClick={() => setErrorModal((prev) => !prev)} />
                            </div>
                        }
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
                        <button type="submit" className="bg-red-500 rounded p-3 max-w-48 mx-auto w-full" onClick={handleSubmit(onSubmit)}>Log in</button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
