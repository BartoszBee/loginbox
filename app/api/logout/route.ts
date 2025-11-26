import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (sessionCookie) {
    const sessionId = sessionCookie.value;

    // usuń sesję z bazy
    const stmt = db.prepare("DELETE FROM sessions WHERE session_id = ?");
    stmt.run(sessionId);
  }

  // przygotuj odpowiedź z redirectem
  const response = NextResponse.redirect(new URL("/", req.url));

  // usuń cookie
  response.headers.set(
    "Set-Cookie",
    "session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax"
  );

  return response;
}
