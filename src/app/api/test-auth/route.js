import { auth } from "@/lib/auth";

export async function GET() {
    const session = await auth();

    return Response.json({
        authenticated: !!session,
        user: session?.user || null,
    });
}
