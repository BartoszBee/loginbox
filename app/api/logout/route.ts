import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (sessionCookie) {
    const sessionId = sessionCookie.value;

    // usuń sesję z DB
    const stmt = db.prepare("DELETE FROM sessions WHERE session_id = ?");
    stmt.run(sessionId);
  }

  // usuń cookie (ustawiając puste i wygasłe)
  const response = NextResponse.json({ success: true });

  response.headers.set(
    "Set-Cookie",
    "session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax"
  );

  return response;
}
