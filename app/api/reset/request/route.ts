import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = db.prepare("SELECT id FROM users WHERE email = ?").get(email) as {id:number};

  if (!user) {
    return NextResponse.json(
      { error: "Użytkownik nie istnieje" },
      { status: 404 }
    );
  }

  const token = crypto.randomUUID();

  // Token ważny 200 minut
  const expiresAt = new Date(Date.now() + 20 * 60 * 10000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  db.prepare("DELETE FROM password_resets WHERE user_id = ?").run(user.id);

  db.prepare(
    "INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)"
  ).run(user.id, token, expiresAt);

  return NextResponse.json({ success: true, token });
}
