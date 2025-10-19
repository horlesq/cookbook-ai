import { Suspense } from "react";
import RecipeDetailClient from "@/components/RecipeDetailClient";
import Spinner from "@/components/Spinner";

export const metadata = {
    title: "Recipe Details",
};

export default function Page({ params }) {
    return (
        <div className="page-container max-w-6xl pt-8">
            <Suspense fallback={<Spinner />}>
                <RecipeDetailClient recipeId={params.id} />
            </Suspense>
        </div>
    );
}
