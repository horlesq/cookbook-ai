"use client";

import { useSearchParams } from "next/navigation";
import { useRecipes } from "@/contexts/RecipiesContext";
import SearchBar from "@/components/SearchBar";
import List from "@/components/List";

export default function Page() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const {
        recipes,
        loading,
        dislikedRecipeIds,
        addDislikedRecipeIds,
        toggleFavorite,
        fetchRecipes,
    } = useRecipes();

    const handleDislike = async () => {
        if (!query) return;

        // Get current recipe IDs to exclude
        const currentRecipeIds = recipes.map((recipe) => recipe.id);

        // Add current recipes to disliked list
        const allDislikedIds = [...dislikedRecipeIds, ...currentRecipeIds];
        addDislikedRecipeIds(allDislikedIds);

        // Fetch new recipes excluding the disliked ones
        await fetchRecipes(query, allDislikedIds);
    };

    return (
        <div className="page-container">
            <SearchBar initialQuery={query} loading={loading} />

            <List
                title="Suggested recipes"
                recipes={recipes}
                loading={loading}
                onToggleFavorite={toggleFavorite}
                emptyMessage={
                    query
                        ? "No recipes found. Try a different search."
                        : "Enter a search term to find recipes."
                }
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
