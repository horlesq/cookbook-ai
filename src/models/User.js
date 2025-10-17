import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model overwrite in development
export default mongoose.models.User || mongoose.model("User", userSchema);
