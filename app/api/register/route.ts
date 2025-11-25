import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  
  const hashed = bcrypt.hashSync(password, 10);

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
