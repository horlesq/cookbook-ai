import { Clock, Image as DefaultImage } from "lucide-react";
import Image from "next/image";
import BackButton from "./BackButton";
import FavoriteButton from "./FavoriteButton";

export default function RecipeHeader({ recipe }) {
    return (
        <div className="col-span-12 md:col-span-5 flex flex-col md:sticky top-8 h-fit">
            <div className="relative rounded-xl overflow-hidden mb-6 h-80 bg-gray-100 group flex-shrink-0 flex items-center justify-center">
                {recipe.image ? (
                    <Image
                        src={recipe.image}
                        alt={recipe.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        priority
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-300">
                        <DefaultImage size={64} />
                        <span className="text-sm mt-2 text-gray-400">
                            No image available
                        </span>
                    </div>
                )}
                <BackButton />
            </div>

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
        </div>
    );
}
