import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import crypto from "crypto";

interface DbUser {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const stmt = db.prepare(
    "SELECT id, email, password_hash, created_at FROM users WHERE email = ?"
  );

  const user = stmt.get(email) as DbUser | undefined;

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Nieprawidłowy email lub hasło" },
      { status: 401 }
    );
  }

  const isValid = bcrypt.compareSync(password, user.password_hash);

  if (!isValid) {
    return NextResponse.json(
      { success: false, error: "Nieprawidłowy email lub hasło" },
      { status: 401 }
    );
  }

  // ⭐ generowanie sessionId
  const sessionId = crypto.randomUUID();

  // sesja ważna 7 dni
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const insert = db.prepare(
    "INSERT INTO sessions (session_id, user_id, expires_at) VALUES (?, ?, ?)"
  );
  insert.run(sessionId, user.id, expiresAt);

  // ⭐ ustawiamy COOKIE HTTP-ONLY
  const response = NextResponse.json({ success: true });

  response.headers.append(
    "Set-Cookie",
    `session=${sessionId}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax`
  );

  return response;
}
