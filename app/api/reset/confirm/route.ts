import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const { token, password, confirm } = await req.json();

    if (password !== confirm) {
        return NextResponse.json(
            { error: "Hasła nie są zgodne" },
            { status: 400 }
        );
    }

    const reset = db
        .prepare("SELECT user_id, expires_at FROM password_resets WHERE token = ?")
        .get(token) as { user_id: number, expires_at: string };

    if (!reset) {
        return NextResponse.json(
            { error: "Nieprawidłowy token" },
            { status: 400 }
        );
    }

    // sprawdzamy wygaśnięcie tokenu
    const now = new Date();
    const expiresAt = new Date(reset.expires_at);

    if (now > expiresAt) {
        return NextResponse.json(
            { error: "Token wygasł" },
            { status: 400 }
        );
    }

    const hashed = bcrypt.hashSync(password, 10);

    // zmiana hasła
    db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(
        hashed,
        reset.user_id
    );

    // usuwamy token
    db.prepare("DELETE FROM password_resets WHERE token = ?").run(token);

    return NextResponse.json({ success: true });
}
