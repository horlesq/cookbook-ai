"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import List from "@/components/List";
import { useRecipes } from "@/contexts/RecipiesContext";

export default function FavoritesList() {
    const { data: session } = useSession();
    const { favorites, toggleFavorite } = useRecipes();

    // Convert favorites to recipe format for the List component
    const favoriteRecipes = favorites.map((fav) => ({
        ...fav.recipeData,
        id: fav.recipeId,
    }));

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
                <Link
                    href="/auth/signin"
                    className="inline-block px-6 py-3 bg-primary text-white rounded-full hover:bg-secondary transition-colors"
                >
                    Sign In
                </Link>
            </div>
        );
    }

    return (
        <List
            title="Favorites"
            recipes={favoriteRecipes}
            favorites={favorites.map((fav) => fav.recipeId)}
            onToggleFavorite={toggleFavorite}
            showFavorites={true}
            emptyMessage="You haven't added any favorites yet."
        />
    );
}
