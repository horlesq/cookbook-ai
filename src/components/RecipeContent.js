export default function RecipeContent({ recipe }) {
    if (!recipe) return null;

    return (
        <div className="col-span-12 md:col-span-7">
            {recipe.description && (
                <div className="mb-8">
                    <p className="text-lg text-gray-700">
                        {recipe.description}
                    </p>
                </div>
            )}

            {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Ingredients:
                    </h2>
                    <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-primary mr-2">•</span>
                                <span className="text-gray-700">
                                    {ingredient}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {recipe.instructions && recipe.instructions.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Instructions:
                    </h2>
                    <ol className="space-y-4">
                        {recipe.instructions.map((instruction, index) => (
                            <li key={index} className="flex items-start">
                                <span className="font-semibold text-primary min-w-[24px]">
                                    {index + 1}.
                                </span>
                                <span className="text-gray-700">
                                    {instruction}
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
}
