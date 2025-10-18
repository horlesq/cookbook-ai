"use client";

import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRecipes } from "@/contexts/RecipiesContext";
import toast from "react-hot-toast";
import { useState } from "react";
import SpinnerMini from "./SpinnerMini";

export default function FavoriteButton({
    recipe,
    size = 20,
    onToggleFavorite,
    className = "",
    showToast = true,
}) {
    const { favorites, toggleFavorite } = useRecipes();
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const isRecipeFavorite = favorites.some(
        (fav) => fav.recipeId === recipe?.id
    );

    const handleFavoriteClick = async (e) => {
        e.stopPropagation();

        if (!session) {
            if (showToast) {
                toast.error("Please sign in to add favorites");
            }
            return;
        }

        if (isLoading) return;

        setIsLoading(true);

        try {
            if (onToggleFavorite) {
                await onToggleFavorite(recipe);
            } else {
                await toggleFavorite(recipe);
            }

            if (showToast) {
                if (isRecipeFavorite) {
                    toast.success("Removed from favorites");
                } else {
                    toast.success("Added to favorites!");
                }
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            if (showToast) {
                toast.error("Failed to update favorites");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleFavoriteClick}
            disabled={isLoading}
            className={`flex-shrink-0 p-2 hover:bg-gray-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            aria-label={
                isRecipeFavorite ? "Remove from favorites" : "Add to favorites"
            }
        >
            {isLoading ? (
                <SpinnerMini />
            ) : (
                <Heart
                    size={size}
                    className={`transition-colors ${
                        isRecipeFavorite
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400 hover:text-red-500"
                    }`}
                />
            )}
        </button>
    );
}
