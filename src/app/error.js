"use client";

export default function Error({ error, reset }) {
    return (
        <main className="flex justify-center items-center flex-col gap-6 py-16">
            <h1 className="text-3xl font-bold text-gray-900">
                Something went wrong!
            </h1>
            <p className="text-lg text-gray-600">{error.message}</p>

            <button
                className="inline-block bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-medium transition-colors"
                onClick={reset}
            >
                Try again
            </button>
        </main>
    );
}
