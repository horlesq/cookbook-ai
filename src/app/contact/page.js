import Link from "next/link";
import { Github, Linkedin, Mail, Globe } from "lucide-react";

export const metadata = {
    title: "Contact",
};

export default function Page() {
    const developerInfo = {
        name: "Horly",
        email: "adrian.horlescu@gmail.com",
        github: "https://github.com/horlesq",
        linkedin: "https://linkedin.com/in/adrian-horlescu",
        portfolio: "https://horly.dev",
    };

    return (
        <div className="page-container">
            <header className="text-center space-y-4 pt-8">
                <h1 className="text-4xl font-bold text-gray-900">
                    Get in Touch
                </h1>
            </header>

            <section className="space-y-6 text-gray-700 text-lg">
                <p className="leading-relaxed">
                    I&apos;m{" "}
                    <span className="font-semibold text-primary">
                        {developerInfo.name}
                    </span>
                    , a software developer passionate about building modern
                    full-stack applications. Whether you have a project in mind
                    or just want to say hello, feel free to reach out.
                </p>
            </section>

            <section className="space-y-3">
                <Link
                    href={`mailto:${developerInfo.email}`}
                    className="card-item"
                >
                    <div className="flex-shrink-0">
                        <Mail className="text-primary" size={40} />
                    </div>
                    <div className="flex-grow min-w-0">
                        <h3 className="text-base font-semibold text-gray-900">
                            Email
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                            {developerInfo.email}
                        </p>
                    </div>
                </Link>

                <Link
                    href={developerInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-item"
                >
                    <div className="flex-shrink-0">
                        <Github className="text-secondary" size={40} />
                    </div>
                    <div className="flex-grow min-w-0">
                        <h3 className="text-base font-semibold text-gray-900">
                            GitHub
                        </h3>
                        <p className="text-sm text-gray-500">
                            View my projects
                        </p>
                    </div>
                </Link>

                <Link
                    href={developerInfo.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-item"
                >
                    <div className="flex-shrink-0">
                        <Globe className="text-primary" size={40} />
                    </div>
                    <div className="flex-grow min-w-0">
                        <h3 className="text-base font-semibold text-gray-900">
                            Portfolio
                        </h3>
                        <p className="text-sm text-gray-500">
                            Visit my website
                        </p>
                    </div>
                </Link>

                <Link
                    href={developerInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-item"
                >
                    <div className="flex-shrink-0">
                        <Linkedin className="text-secondary" size={40} />
                    </div>
                    <div className="flex-grow min-w-0">
                        <h3 className="text-base font-semibold text-gray-900">
                            LinkedIn
                        </h3>
                        <p className="text-sm text-gray-500">Connect with me</p>
                    </div>
                </Link>
            </section>
        </div>
    );
}
