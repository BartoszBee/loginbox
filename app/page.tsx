import Link from "next/link";
import LoginBox from "@/components/LoginBox";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ info?: string }>;
}) {
  const { info } = await searchParams;
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-sm">

        {/* Nagłówek */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">LoginBox</h1>
          <p className="text-sm text-gray-400 mt-1">demo · Next.js + SQLite</p>
        </div>

        {/* Komunikat przy przekierowaniu z chronionej strony */}
        {info === "login" && (
          <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-4 text-sm text-center">
            Musisz się zalogować, aby przejść do tej strony.
          </p>
        )}

        {/* Box logowania */}
        <LoginBox />

        {/* Linki nawigacyjne */}
        <div className="mt-6 border-t border-gray-200 pt-4 flex flex-col gap-2 text-sm text-center">
          <Link
            href="/protected"
            className="text-gray-500 hover:text-gray-800 hover:underline transition-colors"
          >
            Strona chroniona →
          </Link>
          <Link
            href="/users"
            className="text-gray-500 hover:text-gray-800 hover:underline transition-colors"
          >
            Lista użytkowników →
          </Link>
        </div>

      </div>
    </main>
  );
}
