"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import SpinnerMini from "./SpinnerMini";

export default function SearchBar({ onSearch, initialQuery = "" }) {
    const [query, setQuery] = useState(initialQuery);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSearch = (searchQuery) => {
        setLoading(true);

        setTimeout(() => {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            setLoading(false);
        }, 300);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        handleSearch(query.trim());
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
                    className="flex-grow h-full py-0 px-6 sm:px-8 border-none outline-none 
                     text-lg text-gray-900 bg-transparent placeholder-gray-400 
                     focus:ring-0"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="What do you feel like eating?"
                    disabled={loading}
                />

                <button
                    type="submit"
                    className={`flex items-center justify-center w-14 h-full 
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
