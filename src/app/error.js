"use client";

export default function Error({ error, reset }) {
    return (
        <main className="flex justify-center items-center flex-col gap-6 py-16">
            <h1 className="text-3xl font-bold text-gray-900">
                Something went wrong!
            </h1>
            <p className="text-lg text-gray-600">{error.message}</p>

            <button className="btn-primary" onClick={reset}>
                Try again
            </button>
        </main>
    );
}
