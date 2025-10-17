"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, Clock, Image as DefaultImage } from "lucide-react";
import { useRecipes } from "@/contexts/RecipiesContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const { getRecipeById, favorites } = useRecipes();
    const { data: session } = useSession();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRecipe = () => {
            setLoading(true);

            // First try to get from session storage
            const recipeFromStorage = getRecipeById(params.id);

            if (recipeFromStorage) {
                setRecipe(recipeFromStorage);
                setLoading(false);
                return;
            }

            // If not found in storage, check favorites
            const recipeFromFavorites = favorites.find(
                (fav) => fav.recipeId === Number(params.id)
            );

            if (recipeFromFavorites) {
                setRecipe({
                    ...recipeFromFavorites.recipeData,
                    id: recipeFromFavorites.recipeId,
                });
                setLoading(false);
                return;
            }

            // If still not found, redirect to search
            setLoading(false);
            router.push("/search");
        };

        loadRecipe();
    }, [params.id, getRecipeById, favorites, router]);

    // Check if this recipe is in favorites
    const isRecipeFavorite = favorites.some(
        (fav) => fav.recipeId === recipe?.id
    );

    const handleBack = () => {
        router.back();
    };

    const handleToggleFavorite = async () => {
        if (!session) {
            toast.error("Please sign in to add favorites");
            return;
        }

        if (!recipe) return;

        try {
            await toggleFavorite(recipe);
            if (isRecipeFavorite) {
                toast.success("Removed from favorites");
            } else {
                toast.success("Added to favorites!");
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            toast.error("Failed to update favorites");
        }
    };

    if (loading) {
        return (
            <div className="page-container max-w-6xl">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-1/4" />
                    <div className="h-64 bg-gray-200 rounded-lg" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                    </div>
                </div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="page-container max-w-6xl">
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Recipe not found</p>
                    <button
                        onClick={() => router.push("/search")}
                        className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
                    >
                        Back to Search
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container max-w-6xl pt-8">
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 md:col-span-5 flex flex-col md:sticky top-8 h-fit">
                    <div className="relative rounded-xl overflow-hidden mb-6 h-80 bg-gray-100 group flex-shrink-0 flex items-center justify-center">
                        {recipe.image ? (
                            <Image
                                src={recipe.image}
                                alt={recipe.name}
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-gray-300">
                                <DefaultImage size={64} />
                                <span className="text-sm mt-2 text-gray-400">
                                    No image available
                                </span>
                            </div>
                        )}
                        <button
                            onClick={handleBack}
                            className="absolute top-4 left-4 p-2 bg-white rounded-full hover:bg-primary transition-colors shadow-md"
                        >
                            <ArrowLeft
                                size={20}
                                className="text-gray-700 hover:text-white"
                            />
                        </button>
                    </div>

                    <div className="mb-8 flex-shrink-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                {recipe.name}
                            </h1>
                            <button
                                onClick={handleToggleFavorite}
                                className="p-2 hover:bg-gray-50 rounded-full transition-colors flex-shrink-0"
                                aria-label={
                                    isRecipeFavorite
                                        ? "Remove from favorites"
                                        : "Add to favorites"
                                }
                            >
                                <Heart
                                    size={24}
                                    className={`transition-colors ${
                                        isRecipeFavorite
                                            ? "fill-red-500 text-red-500"
                                            : "text-gray-400 hover:text-red-500"
                                    }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={18} />
                            <span>
                                {recipe.time || recipe.cookTime || "20 min"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 md:col-span-7">
                    {recipe.description && (
                        <div className="mb-8">
                            <p className="text-lg text-gray-700">
                                {recipe.description}
                            </p>
                        </div>
                    )}

                    {recipe.ingredients && recipe.ingredients.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Ingredients:
                            </h2>
                            <ul className="space-y-2">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start"
                                    >
                                        <span className="text-primary mr-2">
                                            •
                                        </span>
                                        <span className="text-gray-700">
                                            {ingredient}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {recipe.instructions && recipe.instructions.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Instructions:
                            </h2>
                            <ol className="space-y-4">
                                {recipe.instructions.map(
                                    (instruction, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start"
                                        >
                                            <span className="font-semibold text-primary mr-3 min-w-[24px]">
                                                {index + 1}.
                                            </span>
                                            <span className="text-gray-700">
                                                {instruction}
                                            </span>
                                        </li>
                                    )
                                )}
                            </ol>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
