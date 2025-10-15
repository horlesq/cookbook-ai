"use client";

import { useSearchParams } from "next/navigation";

import SearchBar from "@/components/SerachBar";
import List from "@/components/List";

const suggestedRecipes = [
    {
        id: 5,
        name: "Mashed potatoes",
        time: "20 min",
        image: null,
    },
    {
        id: 6,
        name: " Potatoes",
        time: "20 min",
        image: null,
    },
    {
        id: 7,
        name: "Mashed potatoes",
        time: "20 min",
        image: null,
    },
    {
        id: 8,
        name: "Mashed potatoes",
        time: "20 min",
        image: null,
    },
    {
        id: 9,
        name: "Mashed potatoes",
        time: "20 min",
        image: null,
    },
    {
        id: 10,
        name: "Mashed potatoes",
        time: "20 min",
        image: null,
    },
];

export default function SearchResultsPage() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "something for dinner";

    const handleSearch = (query) => {
        console.log("New Search initiated for:", query);
    };

    const handleToggleFavorite = (recipeId) => {
        console.log(`Toggle favorite status for recipe ID: ${recipeId}`);
    };

    const handleRecipeClick = (recipe) => {
        console.log("Viewing recipe details for:", recipe.name);
    };

    const handleDislike = () => {
        alert("We will show you new suggestions!");
    };

    return (
        <div className="page-container">
            <SearchBar onSearch={handleSearch} initialQuery={initialQuery} />

            <List
                title="Suggested recipes"
                recipes={suggestedRecipes}
                onToggleFavorite={handleToggleFavorite}
                onRecipeClick={handleRecipeClick}
                emptyMessage="Nu am găsit rețete sugerate bazate pe căutarea ta."
            />

            <div className="text-center">
                <button onClick={handleDislike} className="btn-primary">
                    I don&apos;t like these
                </button>
            </div>
        </div>
    );
}
