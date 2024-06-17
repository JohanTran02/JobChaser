import SignUpForm from "../components/SignUp/SignUpForm";

export default function SignUp() {
    return (
        <>
            <div className="grid h-full w-full place-items-center">
                <div className={`container mx-auto px-5 max-w-96`}>
                    <SignUpForm />
                </div>
            </div>
        </>
    )
}