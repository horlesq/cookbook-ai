import AuthSection from "./AuthSection";
import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
    return (
        <header className="border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
                <Logo />
                <div className="flex items-center gap-6">
                    <Navigation />
                    <AuthSection />
                </div>
            </div>
        </header>
    );
}
