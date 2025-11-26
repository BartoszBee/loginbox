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

  const stmt = db.prepare("SELECT user_id FROM sessions WHERE session_id = ?");
  const session = stmt.get(sessionCookie.value);

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

  return (
    <main className="min-h-screen p-8 text-center">
      <h1 className="text-3xl font-bold text-red-600">Witaj w strefie chronionej</h1>
      <Link
        href="/"
        className="text-blue-600 hover:underline text-sm inline-block mt-4"
      >
        ← Powrót do logowania
      </Link>
    </main>
  );
}
