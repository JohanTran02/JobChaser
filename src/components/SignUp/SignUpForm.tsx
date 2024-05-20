import { SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

import Form from "../Forms/Form";
import { IFormInput } from "../../job.d";

export default function SignUpForm() {
    const navigate = useNavigate();
    const signUp: SubmitHandler<IFormInput> = (data) => {
        const { email, password } = data;
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/JobChaser/");
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`${errorCode} : ${errorMessage}`)
            });
    };

    return (
        <>
            <Form pattern="Sign Up" submitHandler={signUp} />
        </>
    )
}
