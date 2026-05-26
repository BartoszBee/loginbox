import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !email.includes("@") || !email.includes(".")) {
    return NextResponse.json(
      { success: false, error: "Nieprawidłowy adres email" },
      { status: 400 }
    );
  }

  if (!password || password.length < 6) {
    return NextResponse.json(
      { success: false, error: "Hasło musi mieć co najmniej 6 znaków" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  try {
    const stmt = db.prepare(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)"
    );
    stmt.run(email, hashed);

    return NextResponse.json({ success: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (ex: any) {
    if (ex.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return NextResponse.json(
        { success: false, error: "Email jest już zajęty" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Błąd serwera" },
      { status: 500 }
    );
  }
}
