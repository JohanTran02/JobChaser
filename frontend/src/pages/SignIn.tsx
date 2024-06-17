import SignInForm from "../components/Signin/SignInForm";

export default function SignIn() {
    return (
        <>
            <div className="grid h-full w-full place-items-center">
                <div className={`container mx-auto px-5 max-w-96`}>
                    <SignInForm />
                </div>
            </div>
        </>
    )
}

