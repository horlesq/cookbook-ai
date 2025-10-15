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
        <div className="page-container">
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
