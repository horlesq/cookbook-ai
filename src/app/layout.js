import "./globals.css";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata = {
    title: {
        template: "%s | Cookbook AI",
        default: "Cookbook AI",
    },
    description:
        "Your personal recipe generator. Use Artificial Intelligence (AI) to instantly create unique recipes, customized meal plans, and culinary suggestions from the ingredients you have at home.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head></head>
            <body
                className={`${inter.className} antialiased min-h-screen flex flex-col`}
            >
                <Header />

                <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
                    <div className="max-w-6xl mx-auto w-full">{children}</div>
                </main>

                <Footer />
            </body>
        </html>
    );
}
