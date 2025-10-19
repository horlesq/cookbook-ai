import { Suspense } from "react";
import SearchPageClient from "@/components/SearchPageClient";
import Spinner from "@/components/Spinner";

export const metadata = {
    title: "Search Recipes",
};

export default function Page({ searchParams }) {
    const query = searchParams.q || "";

    return (
        <div className="page-container">
            <Suspense fallback={<Spinner />}>
                <SearchPageClient initialQuery={query} />
            </Suspense>
        </div>
    );
}
