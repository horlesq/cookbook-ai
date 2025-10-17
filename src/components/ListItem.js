"use client";

import { Image as DefaultIamge, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecipes } from "@/contexts/RecipiesContext";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function ListItem({
    recipe,
    isFavorite = false,
    onToggleFavorite,
}) {
    const router = useRouter();
    const { toggleFavorite, favorites } = useRecipes();
    const { data: session } = useSession();

    // Check if this recipe is in favorites
    const isRecipeFavorite = favorites.some(
        (fav) => fav.recipeId === recipe.id
    );

    const handleFavoriteClick = async (e) => {
        e.stopPropagation();

        if (!session) {
            toast.error("Please sign in to add favorites");
            return;
        }

        try {
            if (onToggleFavorite) {
                await onToggleFavorite(recipe);
            } else {
                await toggleFavorite(recipe);
            }

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

    const handleClick = () => {
        router.push(`/recipe/${recipe.id}`);
    };

    return (
        <div onClick={handleClick} className="card-item">
            <div className="rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                {recipe.image ? (
                    <Image
                        src={recipe.image}
                        alt={recipe.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <DefaultIamge
                        className="text-gray-300"
                        width={40}
                        height={40}
                    />
                )}
            </div>

            <div className="flex-grow min-w-0">
                <h3 className="text-base font-semibold text-gray-900 truncate">
                    {recipe.name}
                </h3>
                <p className="text-sm text-gray-500">
                    {recipe.cookTime || recipe.time || "20 min"}
                </p>
            </div>

            <button
                onClick={handleFavoriteClick}
                className="flex-shrink-0 p-2 hover:bg-gray-50 rounded-full transition-colors"
                aria-label={
                    isRecipeFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                <Heart
                    size={20}
                    className={`transition-colors ${
                        isRecipeFavorite
                            ? "fill-primary text-primary"
                            : "text-gray-400 hover:text-primary"
                    }`}
                />
            </button>
        </div>
    );
}
