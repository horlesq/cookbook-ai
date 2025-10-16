"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import SearchBar from "@/components/SerachBar";
import List from "@/components/List";

export default function Page() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "something for dinner";

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecipes() {
            setLoading(true);
            try {
                const response = await fetch("/api/generate-recipe", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ query: initialQuery }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch recipes.");
                }

                const data = await response.json();
                setRecipes(data.recipes || []);
                console.log(data)
            } catch (error) {
                console.error("Error fetching recipes:", error);
                setRecipes([]);
            } finally {
                setLoading(false);
            }
        }

        fetchRecipes();
    }, [initialQuery]);

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
                recipes={recipes}
                loading={loading}
                onToggleFavorite={handleToggleFavorite}
                onRecipeClick={handleRecipeClick}
                emptyMessage="No recipes found. Try a different search."
            />

            {!loading && recipes.length > 0 && (
                <div className="text-center">
                    <button onClick={handleDislike} className="btn-primary">
                        I don&apos;t like these
                    </button>
                </div>
            )}
        </div>
    );
}
