export default function RecipeDetailSkeleton() {
    return (
        <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="h-64 bg-gray-200 rounded-lg" />
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
        </div>
    );
}