import Link from "next/link";
import RegisterBox from "@/components/RegisterBox";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-sm text-center">
        <RegisterBox />

        <Link href="/" className="text-blue-600 hover:underline text-sm inline-block mt-4">
          ← Powrót do logowania
        </Link>
      </div>
    </main>
  );
}
