import { SubmitHandler } from "react-hook-form";
import Form from "../Forms/Form";
import { IFormInput } from "../../job.d";
import { signUpFetch } from "../../Features/SignUp/signUp";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
    const navigate = useNavigate();
    const [errorModal, setErrorModal] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const onSignUp: SubmitHandler<IFormInput> = async (data) => {
        try {
            const response = await signUpFetch(data);
            console.log(response)
            if (response.error) {
                setErrorModal(true);
                setError(response.error)
                throw new Error(response.error)
            }
            else {
                navigate("/JobChaser/Jobs");
            }
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <>
            {errorModal &&
                <div className="bg-red-300 p-4 border-red-500 relative mb-3 rounded-sm">
                    <p className="text-red-800">{error}</p>
                    <XCircleIcon className="h-6 w-6 absolute right-0 top-0 cursor-pointer" onClick={() => setErrorModal((prev) => !prev)} />
                </div>
            }
            <Form pattern="Sign Up" submitHandler={onSignUp} />
        </>
    )
}
