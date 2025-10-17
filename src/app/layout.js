import "./globals.css";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { RecipesProvider } from "@/contexts/RecipiesContext";
import SessionProvider from "@/contexts/SessionProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata = {
    title: {
        template: "%s | CookbookAI",
        default: "CookbookAI",
    },
    description:
        "Your personal recipe generator. Use Artificial Intelligence to instantly create unique recipes and culinary suggestions from the ingredients you have at home.",
};

export default async function RootLayout({ children }) {
    return (
        <html lang="en">
            <head></head>
            <body
                className={`${inter.className} antialiased min-h-screen flex flex-col`}
            >
                <SessionProvider>
                    <RecipesProvider>
                        <Header />

                        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
                            <div className="max-w-6xl mx-auto w-full">
                                {children}
                            </div>
                        </main>

                        <Footer />
                        <Toaster
                            position="top-center"
                            toastOptions={{
                                duration: 4000,
                                style: {
                                    background: "#363636",
                                    color: "#fff",
                                },
                                success: {
                                    duration: 1000,
                                    iconTheme: {
                                        primary: "#10b981",
                                        secondary: "#fff",
                                    },
                                },
                                error: {
                                    duration: 2000,
                                    iconTheme: {
                                        primary: "#ef4444",
                                        secondary: "#fff",
                                    },
                                },
                            }}
                        />
                    </RecipesProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
