"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useRecipes } from "@/contexts/RecipiesContext";
import RecipeHeader from "./RecipeHeader";
import RecipeImage from "./RecipeImage";
import RecipeDescription from "./RecipeDescription";
import RecipeIngredients from "./RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions";
import RecipeDetailSkeleton from "./RecipeDetailSkeleton";

export default function RecipeDetailClient({ recipeId }) {
    const params = useParams();
    const router = useRouter();
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
            // router.push("/search");
        };

        loadRecipe();
    }, [id, getRecipeById, favorites, router]);

    const handleBack = () => {
        router.back();
    };

    if (loading) {
        return <RecipeDetailSkeleton />;
    }

    if (!recipe) {
        return ;
    }

    return (
        <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Sticky */}
            <div className="col-span-12 md:col-span-5 flex flex-col md:sticky top-8 h-fit">
                <RecipeImage
                    image={recipe.image}
                    name={recipe.name}
                    onBack={handleBack}
                />
                <RecipeHeader recipe={recipe} />
            </div>

            {/* Right Column - Content */}
            <div className="col-span-12 md:col-span-7">
                <RecipeDescription description={recipe.description} />
                <RecipeIngredients ingredients={recipe.ingredients} />
                <RecipeInstructions instructions={recipe.instructions} />
            </div>
        </div>
    );
}
