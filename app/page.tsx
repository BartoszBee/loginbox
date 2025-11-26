import Link from "next/link";
import LoginBox from "@/components/LoginBox";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-3">Witaj w aplikacji</h1>
      <p className="text-red-600 mb-2">(Zastosowano SQLite - działanie lokalne)</p>

      <div className="w-full max-w-sm text-center">
        <LoginBox />

        <p className="text-center mt-4 text-sm">
          Nie masz konta?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Zarejestruj się
          </Link>
        </p>
        <p className="text-3xl font-bold mt-3">⁘</p>
        <Link
          href="/users"
          className="text-blue-600 hover:underline mx-auto inline-block  mt-4"
        >
          Lista użytkowników →
        </Link>
        <Link
          href="/protected"
          className="text-red-600 hover:underline mx-auto inline-block  mb-3 "
        >
          Strona tylko dla zalogowanych użytkowników →
        </Link>
      </div>
    </main>
  );
}
