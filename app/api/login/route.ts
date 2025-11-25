import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

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

  return NextResponse.json({ success: true });
}
