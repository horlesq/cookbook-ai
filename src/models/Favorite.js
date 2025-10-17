import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },
        recipeId: {
            type: Number,
            required: [true, "Recipe ID is required"],
        },
        recipeData: {
            type: Object,
            required: [true, "Recipe data is required"],
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate favorites for same user and recipe
favoriteSchema.index({ user: 1, recipeId: 1 }, { unique: true });

export default mongoose.models.Favorite ||
    mongoose.model("Favorite", favoriteSchema);
