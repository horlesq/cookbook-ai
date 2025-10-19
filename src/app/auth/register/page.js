import RegisterForm from "@/components/RegisterForm";

export const metadata = {
    title: "Register",
};

export default function Register() {
    return (
        <div className="page-container pt-8">
            <header className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">
                    Create Account
                </h1>
                <p className="text-lg text-gray-600">Sign up for CookbookAI</p>
            </header>

            <RegisterForm />
        </div>
    );
}
