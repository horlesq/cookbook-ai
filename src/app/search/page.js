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

    const {
        recipes,
        loading,
        setLoading,
        updateRecipes,
        dislikedRecipeIds,
        addDislikedRecipeIds,
    } = useRecipes();

    const fetchRecipes = async (excludeIds = []) => {
        setLoading(true);
        try {
            const response = await fetch("/api/generate-recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: initialQuery,
                    excludeIds: excludeIds,
                }),
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
    };

    useEffect(() => {
        // Fetch recipes when the query changes
        if (initialQuery !== previousQueryRef.current) {
            previousQueryRef.current = initialQuery;
            // Clear disliked IDs when query changes
            fetchRecipes();
        }
        // Also fetch if we don't have any recipes (initial load)
        else if (recipes.length === 0) {
            fetchRecipes();
        }
    }, [initialQuery, recipes.length]);

    const handleSearch = (query) => {
        console.log("New Search initiated for:", query);
        // Clear previous recipes immediately for better UX
        updateRecipes([]);
    };

    const handleToggleFavorite = (recipeId) => {
        console.log(`Toggle favorite status for recipe ID: ${recipeId}`);
    };

    const handleDislike = async () => {
        // Get current recipe IDs to exclude
        const currentRecipeIds = recipes.map((recipe) => recipe.id);

        // Add current recipes to disliked list
        addDislikedRecipeIds(currentRecipeIds);

        // Fetch new recipes excluding the disliked ones
        const allDislikedIds = [...dislikedRecipeIds, ...currentRecipeIds];
        await fetchRecipes(allDislikedIds);
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
