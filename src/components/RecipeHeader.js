import { Clock } from "lucide-react";
import FavoriteButton from "./FavoriteButton";

export default function RecipeHeader({ recipe }) {
    return (
        <div className="mb-8 flex-shrink-0">
            <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {recipe.name}
                </h1>
                <FavoriteButton recipe={recipe} size={24} />
            </div>
            <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} />
                <span>{recipe.time || recipe.cookTime || "20 min"}</span>
            </div>
        </div>
    );
}
