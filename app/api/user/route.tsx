import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();

        if (!user || !user.primaryEmailAddress?.emailAddress) {
            return NextResponse.json(
                { error: "Unauthorized or missing email address" },
                { status: 401 }
            );
        }

        const email = user.primaryEmailAddress.emailAddress;

        // Check if user already exists
        const existingUsers = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

        if (existingUsers.length > 0) {
            const existing = existingUsers[0] as any;
            const safeExisting = {
                ...existing,
                id: typeof existing.id === "bigint" ? Number(existing.id) : existing.id,
            };
            return NextResponse.json(safeExisting);
        }

        // Insert new user
        const insertedUsers = await db
            .insert(usersTable)
            .values({
                name: user.fullName ?? "",
                email: email,
            })
            .returning();

        const inserted = insertedUsers[0] as any;
        const safeInserted = {
            ...inserted,
            id: typeof inserted.id === "bigint" ? Number(inserted.id) : inserted.id,
        };

        return NextResponse.json(safeInserted);
    } catch (e: any) {
        console.error("POST /api/user error:", e);
        return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
    }
}

// npx drizzle-kit generate:migration --name init_users_schema
