import SignInForm from "@/components/SignInForm";


export const metadata = {
    title: "Sign In",
};

export default function SignIn() {
    return (
        <div className="page-container pt-8">
            <header className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Sign In</h1>
            </header>

            <SignInForm />
        </div>
    );
}
