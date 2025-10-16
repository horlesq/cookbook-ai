import ListItem from "./ListItem";
import ListItemSkeleton from "./ListItemSkeleton";

export default function List({
    title,
    recipes = [],
    favorites = [],
    onToggleFavorite,
    onRecipeClick,
    emptyMessage = "No recipes found",
    showFavorites = false,
    loading = false,
    skeletonCount = 5,
}) {
    const isFavorite = (recipeId) => favorites.includes(recipeId);

    return (
        <div className="w-full">
            {title && (
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">
                    {title}
                </h2>
            )}

            {loading ? (
                <div className="space-y-3">
                    {Array.from({ length: skeletonCount }).map((_, index) => (
                        <ListItemSkeleton key={index} />
                    ))}
                </div>
            ) : recipes.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">{emptyMessage}</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {recipes.map((recipe) => (
                        <ListItem
                            key={recipe.id}
                            recipe={recipe}
                            isFavorite={showFavorites || isFavorite(recipe.id)}
                            onToggleFavorite={onToggleFavorite}
                            onClick={onRecipeClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
