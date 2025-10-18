export default function RecipeInstructions({ instructions }) {
    if (!instructions || instructions.length === 0) return null;

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Instructions:
            </h2>
            <ol className="space-y-4">
                {instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                        <span className="font-semibold text-primary mr-3 min-w-[24px]">
                            {index + 1}.
                        </span>
                        <span className="text-gray-700">{instruction}</span>
                    </li>
                ))}
            </ol>
        </div>
    );
}
