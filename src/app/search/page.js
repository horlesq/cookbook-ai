"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import SearchBar from "@/components/SearchBar";
import List from "@/components/List";
import { useRecipes } from "@/contexts/RecipiesContext";

export default function SearchResultsPage() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "something for dinner";
    const previousQueryRef = useRef(initialQuery);

    const { recipes, loading, setLoading, updateRecipes } = useRecipes();

    useEffect(() => {
        async function fetchRecipes() {
            setLoading(true);
            try {
                const response = await fetch("/api/generate-recipe", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ query: initialQuery }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch recipes.");
                }

                const data = await response.json();
                updateRecipes(data.recipes || []);
            } catch (error) {
                console.error("Error fetching recipes:", error);
                updateRecipes([]);
            } finally {
                setLoading(false);
            }
        }

        // Fetch recipes when the query changes
        if (initialQuery !== previousQueryRef.current) {
            previousQueryRef.current = initialQuery;
            fetchRecipes();
        }
        // Also fetch if we don't have any recipes (initial load)
        else if (recipes.length === 0) {
            fetchRecipes();
        }
    }, [initialQuery, recipes.length, setLoading, updateRecipes]);

    const handleSearch = (query) => {
        console.log("New Search initiated for:", query);
        // Clear previous recipes immediately for better UX
        updateRecipes([]);
    };

    const handleToggleFavorite = (recipeId) => {
        console.log(`Toggle favorite status for recipe ID: ${recipeId}`);
    };

    const handleDislike = () => {
        alert("We will show you new suggestions!");
    };

    return (
        <div className="page-container">
            <SearchBar
                onSearch={handleSearch}
                initialQuery={initialQuery}
                loading={loading}
            />

            <List
                title="Suggested recipes"
                recipes={recipes}
                loading={loading}
                onToggleFavorite={handleToggleFavorite}
                emptyMessage="No recipes found. Try a different search."
            />

            {!loading && recipes.length > 0 && (
                <div className="text-center">
                    <button onClick={handleDislike} className="btn-primary">
                        I don&apos;t like these
                    </button>
                </div>
            )}
        </div>
    );
}
