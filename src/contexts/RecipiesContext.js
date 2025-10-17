"use client";

import { createContext, useContext, useState, useEffect } from "react";

const RecipesContext = createContext();

export function RecipesProvider({ children }) {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load recipes from sessionStorage on mount
    useEffect(() => {
        const savedRecipes = sessionStorage.getItem("recipes");
        if (savedRecipes) {
            try {
                setRecipes(JSON.parse(savedRecipes));
            } catch (error) {
                console.error("Error loading recipes from storage:", error);
            }
        }
    }, []);

    // Save recipes to sessionStorage whenever they change
    useEffect(() => {
        if (recipes.length > 0) {
            sessionStorage.setItem("recipes", JSON.stringify(recipes));
        }
    }, [recipes]);

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

    return (
        <RecipesContext.Provider
            value={{
                recipes,
                loading,
                setLoading,
                updateRecipes,
                clearRecipes,
                getRecipeById,
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
