"use client";

import { Image as DefaultIamge, Heart } from "lucide-react";
import Image from "next/image";

export default function ListItem({
    recipe,
    isFavorite = false,
    onToggleFavorite,
    onClick,
}) {
    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        onToggleFavorite?.(recipe.id);
    };

    return (
        <div
            onClick={() => onClick?.(recipe)}
            className="flex items-center gap-4 p-4 bg-gray-100 rounded-2xl shadow-md
                 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        >
            <div className="rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                {recipe.image ? (
                    <Image
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <DefaultIamge className="text-gray-300" width={40} height={40}/>
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
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                }
            >
                <Heart
                    size={20}
                    className={`transition-colors ${
                        isFavorite
                            ? "fill-primary text-primary"
                            : "text-gray-400 hover:text-primary"
                    }`}
                />
            </button>
        </div>
    );
}
