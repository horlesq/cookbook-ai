import { Suspense } from "react";
import RecipeDetailClient from "@/components/RecipeDetailClient";
import RecipeDetailSkeleton from "@/components/RecipeDetailSkeleton";

export default function Page({ params }) {
    return (
        <div className="page-container max-w-6xl pt-8">
            <Suspense fallback={<RecipeDetailSkeleton />}>
                <RecipeDetailClient recipeId={params.id} />
            </Suspense>
        </div>
    );
}
