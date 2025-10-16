export default function ListItemSkeleton() {
    return (
        <div className="card-item animate-pulse">
            <div className="rounded-lg flex-shrink-0 bg-gray-200 w-11 h-11" />

            <div className="flex-grow min-w-0 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>

            <div className="flex-shrink-0 p-2">
                <div className="w-5 h-5 bg-gray-200 rounded-full" />
            </div>
        </div>
    );
}
