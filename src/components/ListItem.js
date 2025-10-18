"use client";

import { Image as DefaultIamge } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FavoriteButton from "./FavoriteButton";

export default function ListItem({ recipe, onToggleFavorite }) {
    const router = useRouter();

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

            <FavoriteButton
                recipe={recipe}
                size={20}
                onToggleFavorite={onToggleFavorite}
            />
        </div>
    );
}
