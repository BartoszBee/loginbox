import { cookies } from "next/headers";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function ProtectedPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Brak dostępu</h1>
        <Link href="/" className="text-blue-600 underline">
          Zaloguj się
        </Link>
      </div>
    );
  }

  const stmt = db.prepare("SELECT user_id, expires_at FROM sessions WHERE session_id = ?");
  const session = stmt.get(sessionCookie.value) as { user_id: number; expires_at: string } | undefined;

  if (!session) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Sesja wygasła</h1>
        <Link href="/" className="text-blue-600 underline">
          Zaloguj się ponownie
        </Link>
      </div>
    );
  }

  const expiresAt = new Date(session.expires_at.replace(" ", "T") + "Z");
  if (new Date() > expiresAt) {
    db.prepare("DELETE FROM sessions WHERE session_id = ?").run(sessionCookie.value);
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Sesja wygasła</h1>
        <Link href="/" className="text-blue-600 underline">
          Zaloguj się ponownie
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Strefa chroniona</h1>
      <p className="text-lg mb-4">Jesteś poprawnie zalogowany 🎉</p>

      
      <Link
        href="/"
        className="text-blue-600 hover:underline text-sm inline-block mt-4"
      >
        ← Powrót do logowania
      </Link>

      <form action="/api/logout" method="POST">
        <button
          type="submit"
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Wyloguj
        </button>
      </form>
    </main>
  );
}
