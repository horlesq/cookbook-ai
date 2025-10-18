"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRecipes } from "@/contexts/RecipiesContext";
import SpinnerMini from "./SpinnerMini";

export default function SearchBar({ loading, initialQuery = "" }) {
    const [query, setQuery] = useState(initialQuery);
    const [placeholder, setPlaceholder] = useState(
        "What do you feel like eating?"
    );
    const router = useRouter();
    const { fetchRecipes } = useRecipes();

    useEffect(() => {
        const updatePlaceholder = () => {
            if (window.innerWidth < 640) {
                setPlaceholder("Search recipes...");
            } else if (window.innerWidth < 768) {
                setPlaceholder("What are you craving?");
            } else {
                setPlaceholder("What do you feel like eating?");
            }
        };

        updatePlaceholder();
        window.addEventListener("resize", updatePlaceholder);

        return () => window.removeEventListener("resize", updatePlaceholder);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim() || loading) return;

        // Update URL first
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);

        // Then fetch recipes directly
        await fetchRecipes(query.trim());
    };

    return (
        <div className="mx-auto my-10">
            <form
                onSubmit={handleSubmit}
                className="relative flex items-center h-14 
                                              rounded-full bg-gray-50 border border-gray-300/70 
                                              focus-within:border-primary"
            >
                <input
                    type="text"
                    className="flex-grow h-full py-0 pl-6 pr-14 sm:pl-8 sm:pr-16 border-none outline-none 
                     text-base sm:text-lg text-gray-900 bg-transparent placeholder-gray-400 
                     focus:ring-0"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    disabled={loading}
                />

                <button
                    type="submit"
                    className={`absolute right-0 flex items-center justify-center w-14 h-full 
                      transition duration-200 ease-in-out 
                      ${
                          loading || !query.trim()
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:scale-110 active:scale-95"
                      }`}
                    disabled={loading || !query.trim()}
                >
                    {loading ? (
                        <SpinnerMini />
                    ) : (
                        <Search
                            size={24}
                            className="text-primary font-extrabold"
                        />
                    )}
                </button>
            </form>
        </div>
    );
}
