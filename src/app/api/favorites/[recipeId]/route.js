
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Favorite from "@/models/Favorite";

// Remove from favorites
export async function DELETE(request, { params }) {
    try {
        const session = await auth();

        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }

        const { recipeId } = params;

        await connectDB();

        const favorite = await Favorite.findOneAndDelete({
            user: session.user.id,
            recipeId: parseInt(recipeId),
        });

        if (!favorite) {
            return new Response(
                JSON.stringify({ error: "Favorite not found" }),
                {
                    status: 404,
                }
            );
        }

        return new Response(JSON.stringify({ message: "Favorite removed" }), {
            status: 200,
        });
    } catch (error) {
        console.error("Error removing favorite:", error);
        return new Response(
            JSON.stringify({ error: "Failed to remove favorite" }),
            {
                status: 500,
            }
        );
    }
}

// Check if recipe is favorited
export async function GET(request, { params }) {
    try {
        const session = await auth();

        if (!session) {
            return new Response(JSON.stringify({ isFavorite: false }), {
                status: 200,
            });
        }

        const { recipeId } = params;

        await connectDB();

        const favorite = await Favorite.findOne({
            user: session.user.id,
            recipeId: parseInt(recipeId),
        });

        return new Response(JSON.stringify({ isFavorite: !!favorite }), {
            status: 200,
        });
    } catch (error) {
        console.error("Error checking favorite:", error);
        return new Response(JSON.stringify({ isFavorite: false }), {
            status: 200,
        });
    }
}
