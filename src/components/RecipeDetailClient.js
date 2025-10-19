"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRecipes } from "@/contexts/RecipiesContext";
import Spinner from "./Spinner";
import RecipeContent from "./RecipeContent";
import RecipeHeader from "./RecipeHeader";

export default function RecipeDetailClient({ recipeId }) {
    const params = useParams();
    const { getRecipeById, favorites } = useRecipes();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const id = recipeId || params.id;

    useEffect(() => {
        const loadRecipe = () => {
            setLoading(true);

            // First try to get from context storage
            const recipeFromStorage = getRecipeById(id);

            if (recipeFromStorage) {
                setRecipe(recipeFromStorage);
                setLoading(false);
                return;
            }

            // If not found in storage, check favorites
            const recipeFromFavorites = favorites.find(
                (fav) => fav.recipeId === Number(id)
            );

            if (recipeFromFavorites) {
                setRecipe({
                    ...recipeFromFavorites.recipeData,
                    id: recipeFromFavorites.recipeId,
                });
                setLoading(false);
                return;
            }

            setLoading(false);
        };

        loadRecipe();
    }, [id, getRecipeById, favorites]);

    if (loading) {
        return <Spinner />;
    }

    if (!recipe) {
        return null;
    }

    return (
        <div className="grid grid-cols-12 gap-8">
            <RecipeHeader recipe={recipe} />
            <RecipeContent recipe={recipe} />
        </div>
    );
}
