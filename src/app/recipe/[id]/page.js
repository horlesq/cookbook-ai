"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, Clock } from "lucide-react";
import { useRecipes } from "@/contexts/RecipiesContext";
import Image from "next/image";

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const { getRecipeById } = useRecipes();

    const [recipe, setRecipe] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const recipeData = getRecipeById(params.id);
        if (recipeData) {
            setRecipe(recipeData);
        } else {
            router.push("/search");
        }
    }, [params.id, getRecipeById, router]);

    const handleBack = () => {
        router.back();
    };

    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite);
        console.log("Toggle favorite for recipe:", recipe?.id);
    };

    if (!recipe) {
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

    return (
        <div className="page-container max-w-6xl pt-8">
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 md:col-span-5 flex flex-col sticky top-8 h-fit">
                    {recipe.image && (
                        <div className="relative rounded-xl overflow-hidden mb-6 h-80 bg-gray-100 group flex-shrink-0">
                            <Image
                                src={recipe.image}
                                alt={recipe.name}
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                            />
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
                    )}

                    <div className="mb-8 flex-shrink-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                {recipe.name}
                            </h1>
                            <button
                                onClick={handleToggleFavorite}
                                className="p-2 hover:bg-gray-50 rounded-full transition-colors flex-shrink-0"
                            >
                                <Heart
                                    size={24}
                                    className={`transition-colors ${
                                        isFavorite
                                            ? "fill-red-500 text-red-500"
                                            : "text-gray-400 hover:text-red-500"
                                    }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={18} />
                            <span>{recipe.time}</span>
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
                                            {index + 1}.
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
