"use client";

export default function RefreshButton({
    onDislike,
    loading = false,
    disabled = false,
}) {
    return (
        <div className="text-center">
            <button
                onClick={onDislike}
                disabled={loading || disabled}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Loading new recipes..." : "I don't like these"}
            </button>
        </div>
    );
}
