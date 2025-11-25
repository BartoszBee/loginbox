import { cookies } from "next/headers";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function ProtectedPage() {
  // ⭐ NOWE — cookies() jest async:
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Brak dostępu</h1>
        <Link className="text-blue-600 underline" href="/">
          Przejdź do logowania
        </Link>
      </div>
    );
  }

  const stmt = db.prepare(
    "SELECT user_id, expires_at FROM sessions WHERE session_id = ?"
  );

  const session = stmt.get(sessionCookie.value);

  if (!session) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Brak dostępu</h1>
        <Link className="text-blue-600 underline" href="/">
          Przejdź do logowania
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Strefa chroniona</h1>
      <p className="text-lg mb-4">Jesteś poprawnie zalogowany 🎉</p>

      <Link href="/users" className="text-blue-600 underline">
        Przejdź do listy użytkowników
      </Link>
    </main>
  );
}
