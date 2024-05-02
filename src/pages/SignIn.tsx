// import { SubmitHandler } from "react-hook-form";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase-config";
// import { useNavigate } from "react-router-dom";
import Form from "../components/Signin/Form";
// interface IFormInput {
//     email: string;
//     password: string;
// }

export default function SignIn() {
    // const navigate = useNavigate();
    // const signIn: SubmitHandler<IFormInput> = ({ email, password }) => {
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then().catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.error(`${errorCode} : ${errorMessage}`)
    //             alert("Wrong email or password.")
    //         });
    //     navigate("/JobChaser/")
    // };
    return (
        <>
            <h1>SIGN IN </h1>
            <Form />
        </>
    )
}

