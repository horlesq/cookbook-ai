import Link from "next/link";

export const metadata = {
    title: "About",
};

export default function Page() {
    const GITHUB_REPO_URL = "https://github.com/horlesq/cookbook-ai";

    return (
        <div className="page-container">
            <header className="text-center space-y-4 pt-8">
                <h1 className="text-4xl font-bold text-gray-900">
                    About CookbookAI
                </h1>
            </header>

            <section className="space-y-6 text-gray-700 text-lg">
                <p className="text-2xl font-medium text-primary">
                    Your personal AI-powered recipe generator that transforms
                    simple descriptions into delicious possibilities.
                </p>

                <p className="leading-relaxed">
                    <span className="font-semibold text-gray-900">
                        Cookbook AI
                    </span>{" "}
                    uses Artificial Intelligence to instantly create unique
                    recipes, customized meal plans, and culinary suggestions.
                    Simply describe what you feel like eating, and let AI
                    generate personalized recipes tailored to your preferences.
                    Save your favorites and build your own digital cookbook.
                </p>

                <p className="leading-relaxed">
                    Built with{" "}
                    <span className="font-semibold text-gray-900">
                        React, Next.js, Tailwind CSS
                    </span>
                    , and integrated with modern AI tools to deliver a seamless,
                    responsive experience across all devices.
                </p>
            </section>

            <section className="pt-8 text-center space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                    Open Source Project
                </h3>

                <Link
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 rounded-full bg-primary hover:bg-secondary text-white font-bold text-lg 
                     shadow-lg transition duration-300 hover:bg-opacity-90"
                >
                    View Repository on GitHub
                </Link>
            </section>
        </div>
    );
}
