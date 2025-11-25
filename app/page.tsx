import Link from "next/link";
import LoginBox from "@/components/LoginBox";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-3">Witaj w aplikacji</h1>

      <div className="w-full max-w-sm text-center">

        <Link href="/users" className="text-blue-600 hover:underline mx-auto inline-block  mb-3 mt-4">
         Lista użytkowników 
        </Link>
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
      </div>
    </main>
  );
}
