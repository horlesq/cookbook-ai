"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Example server actions
 * Replace with your actual application logic
 */

// Example sign in action
export async function signInAction(formData) {
    // Replace with your authentication logic
    const email = formData.get("email");
    const password = formData.get("password");

    // Example validation
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    // Add your authentication logic here

    revalidatePath("/dashboard");
    redirect("/dashboard");
}

// Example sign out action
export async function signOutAction() {
    // Replace with your sign out logic
    revalidatePath("/");
    redirect("/");
}

// Example update action
export async function updateItemAction(formData) {
    const id = formData.get("id");
    const name = formData.get("name");

    if (!id || !name) {
        throw new Error("ID and name are required");
    }

    // Replace with your update logic
    console.log("Updating item:", { id, name });

    revalidatePath("/items");
    redirect("/items");
}

// Example create action
export async function createItemAction(formData) {
    const name = formData.get("name");
    const description = formData.get("description");

    if (!name) {
        throw new Error("Name is required");
    }

    // Replace with your creation logic
    console.log("Creating item:", { name, description });

    revalidatePath("/items");
    redirect("/items");
}

// Example delete action
export async function deleteItemAction(itemId) {
    if (!itemId) {
        throw new Error("Item ID is required");
    }

    // Replace with your deletion logic
    console.log("Deleting item:", itemId);

    revalidatePath("/items");
}
