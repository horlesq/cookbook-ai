"use client";
import SearchBar from "@/components/SerachBar";
import List from "@/components/List";

export default function Page() {
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

    return (
        <div className="max-w-xl lg:max-w-2xl mx-auto space-y-12 pb-16 md:pb-24 lg:pb-32">
            <SearchBar />

            <List
                title="Favorites"
                recipes={favoriteRecipes}
                favorites={[1, 2, 3, 4]}
                onToggleFavorite={() => {}}
                onRecipeClick={() => {}}
                showFavorites={true}
            />
        </div>
    );
}
