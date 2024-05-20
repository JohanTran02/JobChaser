import { SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import XCircleIcon from "@heroicons/react/24/outline/esm/XCircleIcon";

import Form from "../Forms/Form";
import { IFormInput } from "../../job.d";

export default function SignInForm() {
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
            {errorModal &&
                <div className="bg-red-300 p-4 border-red-500 relative mb-3">
                    <p className="text-red-800">Incorrect username or password.</p>
                    <XCircleIcon className="h-6 w-6 absolute right-0 top-0 cursor-pointer" onClick={() => setErrorModal((prev) => !prev)} />
                </div>
            }
            <Form pattern="Sign In" submitHandler={onSubmit} />
        </>
    )
}
