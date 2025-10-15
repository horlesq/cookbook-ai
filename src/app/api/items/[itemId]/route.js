import { getItems } from "@/lib/data-service";

// Example generic GET handler for starter template
export async function GET(request, { params }) {
    // Example: fetch items (replace with your logic)
    const items = await getItems();
    return Response.json({ items });
}
