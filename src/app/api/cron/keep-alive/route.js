import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    // Verify the request is from GitHub Actions
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Connect to database and perform a simple query
        const { db } = await connectToDatabase();

        // Ping the database to keep it active
        await db.command({ ping: 1 });

        console.log(
            "Database keep-alive ping successful:",
            new Date().toISOString()
        );

        return NextResponse.json({
            success: true,
            message: "Database pinged successfully",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Keep-alive error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}

// Disable caching for this route
export const dynamic = "force-dynamic";
export const revalidate = 0;
