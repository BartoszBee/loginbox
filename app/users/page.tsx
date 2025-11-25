import { db } from "@/lib/db";
import Link from "next/link";

export default function UsersPage() {
  const stmt = db.prepare(
    "SELECT id, email, created_at FROM users ORDER BY id ASC"
  );

  const users = stmt.all() as {
    id: number;
    email: string;
    created_at: string;
  }[];

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-center">
      <h1 className="text-2xl font-bold mb-2 text-center mx-auto">Lista użytkowników</h1>
      <Link href="/" className="text-blue-600 hover:underline mx-auto inline-block mb-3 mt-4">
          ← Powrót do logowania
        </Link>

      <div className="overflow-x-auto  max-w-3xl mx-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead className="bg-blue-600 border-b text-white">
            <tr>
              <th className="px-4 py-2 text-left font-medium">ID</th>
              <th className="px-4 py-2 text-left font-medium">Email</th>
              <th className="px-4 py-2 text-left font-medium">Data utworzenia</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  Brak użytkowników.
                </td>
              </tr>
            )}

            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="px-4 py-2">{u.id}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
