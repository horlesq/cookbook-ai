export default function RecipeDescription({ description }) {
    if (!description) return null;

    return (
        <div className="mb-8">
            <p className="text-lg text-gray-700">{description}</p>
        </div>
    );
}
