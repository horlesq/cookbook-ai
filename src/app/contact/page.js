import Link from "next/link";
import { Github, Linkedin, Mail, Globe } from "lucide-react";

export const metadata = {
    title: "Contact",
};

export default function Page() {
    const developerInfo = {
        name: "Horly",
        email: "adrian.horlescu@example.com",
        github: "https://github.com/horlesq",
        linkedin: "https://linkedin.com/in/adrian-horlescu",
        portfolio: "https://horly.dev",
    };

    return (
        <div className="max-w-xl lg:max-w-2xl mx-auto space-y-12 pb-16 md:pb-24 lg:pb-32">
            <header className="text-center space-y-4 pt-8">
                <h1 className="text-4xl font-bold text-gray-900">
                    Get in Touch
                </h1>
            </header>

            <section className="space-y-6 text-gray-700 text-lg">
                <p className="leading-relaxed">
                    I'm{" "}
                    <span className="font-semibold text-primary">
                        {developerInfo.name}
                    </span>
                    , a full-stack developer passionate about building modern
                    fullstack applications. Whether you have a project in mind
                    or just want to say hello, feel free to reach out.
                </p>
            </section>

            <section className="space-y-4">
                <Link
                    href={`mailto:${developerInfo.email}`}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 
                             hover:shadow-md transition-shadow duration-200 group"
                >
                    <div
                        className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0
                                  group-hover:bg-primary/20 transition-colors"
                    >
                        <Mail className="text-primary" size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Email</h3>
                        <p className="text-gray-600">{developerInfo.email}</p>
                    </div>
                </Link>

                <Link
                    href={developerInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 
                             hover:shadow-md transition-shadow duration-200 group"
                >
                    <div
                        className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0
                                  group-hover:bg-secondary/20 transition-colors"
                    >
                        <Github className="text-secondary" size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">GitHub</h3>
                        <p className="text-gray-600">View my projects</p>
                    </div>
                </Link>

                <Link
                    href={developerInfo.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 
                             hover:shadow-md transition-shadow duration-200 group"
                >
                    <div
                        className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0
                                  group-hover:bg-primary/20 transition-colors"
                    >
                        <Globe className="text-primary" size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Portfolio
                        </h3>
                        <p className="text-gray-600">Visit my website</p>
                    </div>
                </Link>

                <Link
                    href={developerInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 
                             hover:shadow-md transition-shadow duration-200 group"
                >
                    <div
                        className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0
                                  group-hover:bg-secondary/20 transition-colors"
                    >
                        <Linkedin className="text-secondary" size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            LinkedIn
                        </h3>
                        <p className="text-gray-600">Connect with me</p>
                    </div>
                </Link>
            </section>
        </div>
    );
}
