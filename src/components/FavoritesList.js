"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import List from "@/components/List";

export default function FavoritesList() {
    const { data: session } = useSession();

    const favoriteRecipes = [
        {
            id: 1,
            name: "Mashed potatoes",
            time: "20 min",
            image: null,
        },
        {
            id: 2,
            name: "Mashed potatoes",
            time: "20 min",
            image: null,
        },
        {
            id: 3,
            name: "Mashed potatoes",
            time: "20 min",
            image: null,
        },
        {
            id: 4,
            name: "Mashed potatoes",
            time: "20 min",
            image: null,
        },
    ];

    if (!session) {
        return (
            <div className="text-center space-y-6 py-16">
                <h2 className="text-3xl font-bold text-gray-900">
                    Save Your Favorite Recipes
                </h2>
                <p className="text-lg text-gray-600 max-w-md mx-auto">
                    Sign in to your account to save and organize your favorite
                    recipes in one place.
                </p>
            </div>
        );
    }

    return (
        <List
            title="Favorites"
            recipes={favoriteRecipes}
            favorites={[1, 2, 3, 4]}
            onToggleFavorite={() => {}}
            showFavorites={true}
        />
    );
}
