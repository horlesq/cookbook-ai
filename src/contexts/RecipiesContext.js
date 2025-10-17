"use client";

import { createContext, useContext, useState, useEffect } from "react";

const RecipesContext = createContext();

export function RecipesProvider({ children }) {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dislikedRecipeIds, setDislikedRecipeIds] = useState([]);

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
