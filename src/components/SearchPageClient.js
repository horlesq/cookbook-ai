"use client";

import { useRecipes } from "@/contexts/RecipiesContext";
import SearchBar from "@/components/SearchBar";
import List from "@/components/List";
import RefreshButton from "@/components/RefreshButton";

export default function SearchPageClient({ initialQuery }) {
    const {
        recipes,
        loading,
        dislikedRecipeIds,
        addDislikedRecipeIds,
        toggleFavorite,
        fetchRecipes,
    } = useRecipes();

    const handleDislike = async () => {
        if (!initialQuery) return;

        // Get current recipe IDs to exclude
        const currentRecipeIds = recipes.map((recipe) => recipe.id);

        // Add current recipes to disliked list
        const allDislikedIds = [...dislikedRecipeIds, ...currentRecipeIds];
        addDislikedRecipeIds(allDislikedIds);

        // Fetch new recipes excluding the disliked ones
        await fetchRecipes(initialQuery, allDislikedIds);
    };

    return (
        <>
            <SearchBar initialQuery={initialQuery} loading={loading} />

            <List
                title="Suggested recipes"
                recipes={recipes}
                loading={loading}
                onToggleFavorite={toggleFavorite}
                emptyMessage={
                    initialQuery
                        ? "No recipes found. Try a different search."
                        : "Enter a search term to find recipes."
                }
            />

            {!loading && recipes.length > 0 && (
                <RefreshButton
                    onDislike={handleDislike}
                    disabled={!initialQuery}
                />
            )}
        </>
    );
}
