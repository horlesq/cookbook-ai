
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Favorite from "@/models/Favorite";

// Get favorites
export async function GET(request) {
    try {
        const session = await auth();

        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }

        await connectDB();

        const favorites = await Favorite.find({ user: session.user.id }).sort({
            createdAt: -1,
        });

        return new Response(JSON.stringify({ favorites }), {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching favorites:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch favorites" }),
            {
                status: 500,
            }
        );
    }
}

// Add to favorites
export async function POST(request) {
    try {
        const session = await auth();

        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }

        const { recipeId, recipeData } = await request.json();

        if (!recipeId || !recipeData) {
            return new Response(
                JSON.stringify({ error: "Recipe ID and data are required" }),
                {
                    status: 400,
                }
            );
        }

        await connectDB();

        // Check if already favorited
        const existingFavorite = await Favorite.findOne({
            user: session.user.id,
            recipeId,
        });

        if (existingFavorite) {
            return new Response(
                JSON.stringify({ error: "Recipe already in favorites" }),
                {
                    status: 400,
                }
            );
        }

        const favorite = await Favorite.create({
            user: session.user.id,
            recipeId,
            recipeData,
        });

        return new Response(JSON.stringify({ favorite }), {
            status: 201,
        });
    } catch (error) {
        if (error.code === 11000) {
            return new Response(
                JSON.stringify({ error: "Recipe already in favorites" }),
                {
                    status: 400,
                }
            );
        }
        console.error("Error adding favorite:", error);
        return new Response(
            JSON.stringify({ error: "Failed to add favorite" }),
            {
                status: 500,
            }
        );
    }
}
