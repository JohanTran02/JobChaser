import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import XCircleIcon from "@heroicons/react/24/outline/esm/XCircleIcon";

import Form from "../Forms/Form";
import { IFormInput, options } from "../../job.d";
import { signInFetch } from "../../Features/Signin/signIn";
import { useCookies } from "react-cookie";

export default function SignInForm() {
    const navigate = useNavigate();
    const [errorModal, setErrorModal] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [, setCookie] = useCookies(["token"]);
    const onSignIn: SubmitHandler<IFormInput> = async (data) => {
        try {
            const response = await signInFetch(data);
            if (response.error) {
                setErrorModal(true);
                setError(response.error)
                throw new Error(response.error)
            }
            else {
                setCookie("token", response.token, options)
                navigate("/JobChaser/Jobs");
            }
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <>
            {errorModal &&
                <div className="bg-red-300 p-4 border-red-500 relative mb-3">
                    <p className="text-red-800">{error}</p>
                    <XCircleIcon className="h-6 w-6 absolute right-0 top-0 cursor-pointer" onClick={() => setErrorModal((prev) => !prev)} />
                </div>
            }
            <Form pattern="Sign In" submitHandler={onSignIn} />
        </>
    )
}
