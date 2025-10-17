"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const RecipesContext = createContext();

export function RecipesProvider({ children }) {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dislikedRecipeIds, setDislikedRecipeIds] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const { data: session } = useSession();

    // Load recipes and disliked IDs from sessionStorage on mount
    useEffect(() => {
        const savedRecipes = sessionStorage.getItem("recipes");
        const savedDislikedIds = sessionStorage.getItem("dislikedRecipeIds");

        if (savedRecipes) {
            try {
                setRecipes(JSON.parse(savedRecipes));
            } catch (error) {
                console.error("Error loading recipes from storage:", error);
            }
        }

        if (savedDislikedIds) {
            try {
                setDislikedRecipeIds(JSON.parse(savedDislikedIds));
            } catch (error) {
                console.error(
                    "Error loading disliked IDs from storage:",
                    error
                );
            }
        }
    }, []);

    // Load user favorites when session changes
    useEffect(() => {
        if (session) {
            fetchFavorites();
        } else {
            setFavorites([]);
        }
    }, [session]);

    // Save recipes and disliked IDs to sessionStorage whenever they change
    useEffect(() => {
        if (recipes.length > 0) {
            sessionStorage.setItem("recipes", JSON.stringify(recipes));
        }
    }, [recipes]);

    useEffect(() => {
        if (dislikedRecipeIds.length > 0) {
            sessionStorage.setItem(
                "dislikedRecipeIds",
                JSON.stringify(dislikedRecipeIds)
            );
        }
    }, [dislikedRecipeIds]);

    const fetchFavorites = async () => {
        try {
            const response = await fetch("/api/favorites");
            if (response.ok) {
                const data = await response.json();
                setFavorites(data.favorites || []);
            }
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    const toggleFavorite = async (recipe) => {
        if (!session) {
            // Redirect to sign in or show message
            console.log("Please sign in to add favorites");
            return;
        }

        const isCurrentlyFavorite = favorites.some(
            (fav) => fav.recipeId === recipe.id
        );

        try {
            if (isCurrentlyFavorite) {
                // Remove from favorites
                const response = await fetch(`/api/favorites/${recipe.id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    setFavorites((prev) =>
                        prev.filter((fav) => fav.recipeId !== recipe.id)
                    );
                }
            } else {
                // Add to favorites
                const response = await fetch("/api/favorites", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        recipeId: recipe.id,
                        recipeData: recipe,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setFavorites((prev) => [...prev, data.favorite]);
                }
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const updateRecipes = (newRecipes) => {
        setRecipes(newRecipes);
    };

    const clearRecipes = () => {
        setRecipes([]);
        sessionStorage.removeItem("recipes");
    };

    const getRecipeById = (id) => {
        return recipes.find((recipe) => recipe.id === Number(id));
    };

    const addDislikedRecipeIds = (ids) => {
        setDislikedRecipeIds((prev) => {
            const newIds = [...new Set([...prev, ...ids])];
            return newIds;
        });
    };

    const clearDislikedRecipeIds = () => {
        setDislikedRecipeIds([]);
        sessionStorage.removeItem("dislikedRecipeIds");
    };

    return (
        <RecipesContext.Provider
            value={{
                recipes,
                loading,
                setLoading,
                updateRecipes,
                clearRecipes,
                getRecipeById,
                dislikedRecipeIds,
                addDislikedRecipeIds,
                clearDislikedRecipeIds,
                favorites,
                toggleFavorite,
                fetchFavorites,
            }}
        >
            {children}
        </RecipesContext.Provider>
    );
}

export function useRecipes() {
    const context = useContext(RecipesContext);
    if (!context) {
        throw new Error("useRecipes must be used within RecipesProvider");
    }
    return context;
}
