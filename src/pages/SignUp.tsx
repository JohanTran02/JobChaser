import { SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import Form from "../components/Signin/Form";
import { useNavigate } from "react-router-dom";

interface IFormInput {
    email: string;
    password: string;
}

export default function SignUp() {
    const navigate = useNavigate();
    const signUp: SubmitHandler<IFormInput> = ({ email, password }) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then().catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`${errorCode} : ${errorMessage}`)
                alert("Email already registered.")
            });
        navigate("/JobChaser/");
    };
    return (
        <>
            <p>Sign Up</p>
            <Form />
        </>
    )
}