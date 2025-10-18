export default function RecipeIngredients({ ingredients }) {
    if (!ingredients || ingredients.length === 0) return null;

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ingredients:
            </h2>
            <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-gray-700">{ingredient}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
